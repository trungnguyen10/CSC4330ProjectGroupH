const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const AppError = require(`${__dirname}/../utils/appError`);

exports.getHomePage = function (req, res) {
  res.status(200).render("homepage");
};

exports.getLoginForm = function (req, res) {
  res.status(200).render("login");
};

exports.getSignupForm = function (req, res) {
  res.status(200).render("signup");
};

exports.getProfileForm = function (req, res, next) {
  console.log(req.user);
  res.status(200).render("profile", { user: req.user });
};
