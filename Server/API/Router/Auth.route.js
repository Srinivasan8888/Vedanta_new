const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User.model");
const jwt = require('jsonwebtoken');
const { authSchema } = require("../../Helpers/validation_schema");
const { signAccessToken } = require("../../Helpers/jwt_helper");

router.post("/register", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await authSchema.validateAsync(req.body);

    // const { email, password } = result;

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} is already registered`);

    // const user = new User({ email, password });
    const user = new User(result); 
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    res.send(accessToken);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});

router.get("/login", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await authSchema.validateAsync(req.body);

    const { email, password } = result;

    const doesExist = await User.findOne({ email });
    if (!doesExist) throw createError.Conflict(`${email} is not registered`);

    const ifpasswordValid = await bcrypt.compare(
      req.body.password,
      result.password
    );

    if (ifpasswordValid) {
      const token = jwt.sign(
        {
          email: result.email,
        },
        process.env.JWTKEY
      );
    }

    const user = new User({ email, password });
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  res.send("login route");
});

router.post("/refersh-token", async (req, res, next) => {
  res.send("refersh token route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

module.exports = router;
