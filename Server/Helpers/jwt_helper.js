const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      if (!secret) {
        return reject(createError.InternalServerError("Access token secret is not defined"));
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
  },

  verifyAccessToken: (req, res, next) => {

    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    const secret = process.env.ACCESS_TOKEN_SECRETT;
      if (!secret) {
        return reject(createError.InternalServerError("Access token secret is not defined"));
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
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const secret = process.env.REFERST_TOKEN_SECRET;
      if (!secret) {
        return reject(createError.InternalServerError("Refresh token secret is not defined"));
      }
      const payload = {};
      const options = {
        expiresIn: "1d",
        issuer: "vedanta.xyma.live",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
};
