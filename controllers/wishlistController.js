const Wishlist = require(`${__dirname}/../models/wishlistModel`);
const Listing = require(`${__dirname}/../models/listingModel`);
const AppError = require(`${__dirname}/../utils/appError`);
const catchAsync = require(`${__dirname}/../utils/catchAsync`);

exports.createWishlist = catchAsync(async (req, res, next) => {
  const user_id = req.user._id + "";
  const listing_id = req.body.listing_id;

  const listing = await Listing.find({ _id: listing_id });
  if (listing) {
    const owner_id = listing.belongTo;
    if (user_id != owner_id) {
      const wishlist = await Wishlist.create({ user_id, listing_id });
      res.status(200).json({
        status: "success",
        data: wishlist,
      });
    } else
      return next(
        new AppError(
          "You are the owner of this listing. Cannot add to wishlist",
          400
        )
      );
  } else return next(new AppError("Listing does not exist.", 400));
});

exports.getWishlist = catchAsync(async (req, res, next) => {
  const user_id = req.user._id + "";
  const listings = await Wishlist.find({ user_id });
  res.status(200).json({
    status: "success",
    results: listings.length,
    data: { listings },
  });
});

exports.deleteListingInWishlist = catchAsync(async (req, res, next) => {
  const user_id = req.user._id + "";
  const listing_id = req.params.id;
  const result = await Wishlist.find({ user_id, listing_id });
  if (result.length) {
    await Wishlist.deleteOne({ user_id, listing_id });
    res.status(200).json({
      status: "success",
    });
  } else
    return next(new AppError("Listing does not exist in the wishlist", 400));
});
