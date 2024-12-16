const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User.model");
const { authSchema } = require("../../Helpers/validation_schema");

router.post("/register", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await authSchema.validateAsync(req.body);
    
    const { email, password } = result;

    const doesExist = await User.findOne({ email });
    if (doesExist) throw createError.Conflict(`${email} is already registered`);

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
