const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const AppError = require(`${__dirname}/../utils/appError`);
const Listing = require(`${__dirname}/../models/listingModel`);

exports.getHomePage = catchAsync(async function (req, res, next) {
  const listings = await Listing.find().sort("-createAt");
  console.log(listings);
  res.status(200).render("homepage", { listings });
});

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
