import JWT from 'jsonwebtoken';
import createError from "http-errors";
import {client} from './init_redis.js'
  
export const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      if (!secret) {
        return reject(
          createError.InternalServerError("Access token secret is not defined")
        );
      }
      const payload = {
        audience: userId,
        name: "c3Jpbml2YXNhbg==",
        issuer: "vedanta.xyma.live",
      };
      const options = {
        expiresIn: "5m",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  };

export const verifyAccessToken = (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return reject(
        createError.InternalServerError("Access token secret is not defined")
      );
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "jsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  };

export const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
      const secret = process.env.REFRESH_TOKEN_SECRET;
      if (!secret) {
        return reject(
          createError.InternalServerError("Refresh token secret is not defined")
        );
      }
      const payload = {};
      const options = {
        expiresIn: "30d",
        issuer: "vedanta.xyma.live",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        console.log("Setting refresh token in Redis...");
        client.SETEX(userId, 24 * 60 * 60, token)
          .then(reply => {
            console.log("Finished setting refresh token in Redis.");
            resolve(token);
          })
          .catch(err => {
            console.log("Error setting refresh token in Redis:", err.message);
            reject(createError.InternalServerError());
          });
      });
    });
  };

export const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userId = payload.aud;
          client.GET(userId)
            .then(result => {
              if (refreshToken === result) return resolve(userId);
              reject(createError.Unauthorized());
            })
            .catch(err => {
              console.log(err.message);
              reject(createError.InternalServerError());
            });
        }
      );
    });
  };