const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const AppError = require(`${__dirname}/../utils/appError`);
const Listing = require(`${__dirname}/../models/listingModel`);
const WishList = require(`${__dirname}/../models/wishlistModel`);

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

exports.getProfileForm = catchAsync(async function (req, res, next) {
  const userId = req.user._id + "";
  const listings = await Listing.find({ belongTo: userId }).sort("-createAt");
  const wishlists = await WishList.find({ user_id: userId });
  let listingInWish = [];
  if (wishlists) {
    for (const element of wishlists) {
      const aListing = await Listing.findById(element.listing_id);
      listingInWish.push(aListing);
    }
  }
  res
    .status(200)
    .render("profile", { user: req.user, listings, listingInWish });
});
