import createError from "http-errors";
import User from "../Models/User.model.js";
import { authSchema } from "../../Helpers/validation_schema.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../Helpers/jwt_helper.js";
import { client as redisClient, redisPromise } from "../../Helpers/init_redis.js";
import { RateLimiterRedis } from 'rate-limiter-flexible';

const maxWrongAttemptsByIPperDay = 100;
const maxConsecutiveFailsByEmail = 5;

export const getRedisClient = async () => {
  await redisPromise;
  if (!client.isOpen) {
    console.error("Redis client is not connected yet.");
    throw new Error("Redis client is not connected yet.");
  }
  return client;
};


// Initialize rate limiters after connection
let limiterConsecutiveFailsByEmail, limiterSlowBruteByIP;

export const withRateLimiters = (fn) => {
  return async (req, res, next) => {
    await redisPromise;
    createLimiters();
    return fn(req, res, next);
  };
};

const createLimiters = () => {
  limiterConsecutiveFailsByEmail = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login_fail_consecutive_email',
    points: maxConsecutiveFailsByEmail,
    duration: 60 * 2, // 2 minutes
    blockDuration: 60 * 2, // Block for 2 minutes after 5 attempts
    // duration: 60 * 15, // 15 minutes
    // blockDuration: 60 * 15, // Block for 15 minutes after 5 attempts
    inmemoryBlockOnConsumed: true // Keep tracking even after server restart
  });

  limiterSlowBruteByIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login_fail_ip_per_day',
    points: maxWrongAttemptsByIPperDay,
    duration: 60 * 60 * 24, // 24 hours
    blockDuration: 60 * 60 * 24 // Block for 24 hours after 100 attempts
  });
};

export const register = async (req, res, next) => {
  try {
    // const { email, password } = req.body
    // if (!email || !password) throw createError.BadRequest()
    const result = await authSchema.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(
        `${result.email} is already been registered`
      );

    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

export const login = async (req, res, next) => {
  const ipAddr = req.ip;
  const email = req.body.email;
  const emailKey = `${email}_${ipAddr}`;

  try {
    // Initialize rate limiters first
    await redisPromise;
    createLimiters();

    // Check IP-based limit
    await limiterSlowBruteByIP.consume(ipAddr);
    
    // Check email+IP attempts
    const resEmail = await limiterConsecutiveFailsByEmail.get(emailKey);
    
    if (resEmail?.consumedPoints >= maxConsecutiveFailsByEmail) {
      const retrySecs = Math.round(resEmail.msBeforeNext / 1000) || 1;
      res.set('Retry-After', retrySecs);
      return next(createError.TooManyRequests('Too many failed attempts. Please try again later.'));
    }

    // Validate credentials
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) throw createError.NotFound("User not registered");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("Invalid credentials");

    // Reset counters on success
    await limiterConsecutiveFailsByEmail.delete(emailKey);
    await limiterSlowBruteByIP.delete(ipAddr);

    // Generate tokens
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res.send({ accessToken, refreshToken });

  } catch (error) {
    // Handle all failed attempts
    try {
      await Promise.all([
        limiterConsecutiveFailsByEmail.consume(emailKey),
        limiterSlowBruteByIP.consume(ipAddr)
      ]);
      console.log(`Penalized ${emailKey} - Attempts: ${(await limiterConsecutiveFailsByEmail.get(emailKey))?.consumedPoints || 1}`);
    } catch (rlError) {
      const retrySecs = Math.round(rlError.msBeforeNext / 1000) || 1;
      res.set('Retry-After', retrySecs);
      return next(createError.TooManyRequests('Too many attempts. Please try again later.'));
    }

    // Send appropriate error response
    const status = error.isJoi ? 400 : error.status || 500;
    next(createError(status, error.message));
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({ accessToken: accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    res.send({
      success: true,
      message: "Authorized",
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest("Refresh token is required");

    const userId = await verifyRefreshToken(refreshToken);
    
    // Delete refresh token from Redis
    await redisClient.del(userId);
    
    // Clear cookies
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
    
    res.sendStatus(204);
  } catch (error) {
    // Even if token is invalid, clear client-side storage
    console.error("Logout error:", error.message);
    res.clearCookie('refreshToken');
    next(createError.Unauthorized("Session terminated"));
  }
};
  