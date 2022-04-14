const User = require(`${__dirname}/../models/userModel`);
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const AppError = require(`${__dirname}/../utils/appError`);

//helper function to sign and return the token
const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//helper function to send the response with the token
const respondWithToken = function (statusCode, user, res) {
  const token = signToken(user._id);

  const cookieOptions = {
    expire:
      new Date(Date.now()) +
      process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

exports.signup = catchAsync(async function (req, res, next) {
  // create new user document
  const { name, email, password, passwordConfirm, passwordChangedAt } =
    req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
  });

  // sign the token and let the user be logged in
  respondWithToken(201, newUser, res);
  next();
});

exports.login = catchAsync(async function (req, res, next) {
  // 1- check if email and password exist
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide your email and password", 400));

  // 2- check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.isPasswordCorrect(password, user.password)))
    return next(new AppError("Invalid email or password!", 401));

  // 3- If everything is ok, sign and send back the token for logging in
  respondWithToken(200, user, res);
});

exports.logout = function (req, res) {
  res.cookie("jwt", "LoggedOut", {
    expire: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async function (req, res, next) {
  let token;

  // 1- get the token, check if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) token = req.cookies.jwt;
  // if token exists
  if (!token) return next(new AppError("You are not logged in!"));

  // 2- verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3- check if user still exists
  const decodedUser = await User.findById(decoded.id);
  if (!decodedUser) return next(new Error("This account has been deleted!"));

  // 4- check if user change password after token was signed
  if (decodedUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("Password has been recently changed! Please log in again!")
    );
  }

  // Grant access after verification
  req.user = decodedUser;
  next();
});

exports.updatePassword = catchAsync(async function (req, res, next) {
  // 1- get user from database
  const user = await User.findById(req.user._id).select("+password");

  // 2- check current password
  if (!(await user.isPasswordCorrect(req.body.currentPassword, user.password)))
    return next(new AppError("Your current password is not correct", 401));
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 3- sign new token and send the response
  respondWithToken(201, user, res);
  next();
});

exports.isLoggedIn = async function (req, res) {
  try {
    if (req.cookies.jwt) {
      // 1- get the token, check if it exists
      const token = req.cookies.jwt;

      // 2- verification token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      // 3- check if user still exists
      const decodedUser = await User.findById(decoded.id);
      if (!decodedUser) return false;

      // 4- check if user change password after token was signed
      if (decodedUser.changedPasswordAfter(decoded.iat)) {
        return false;
      }

      // There is a logged in user
      res.locals.user = decodedUser;
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("IS LOGGED IN" + err);
    return false;
  }
};
