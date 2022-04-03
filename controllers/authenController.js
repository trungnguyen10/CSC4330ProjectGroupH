const User = require(`${__dirname}/../models/userModel`);
const jwt = require("jsonwebtoken");

//helper function to sign and return the token
const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async function (req, res, next) {
  try {
    // create new user document
    const { name, email, password, passwordConfirm } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    // sign the token and let the user be logged in
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.toString(),
    });
  }
};

exports.login = async function (req, res, next) {
  // 1- check if email and password exist
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new Error("Please provide your email and password"));

    // 2- check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.isPasswordCorrect(password, user.password)))
      return next(new Error("Invalid email or password!"));

    // 3- If everything is ok, sign and send back the token for logging in
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.toString(),
    });
  }
};
