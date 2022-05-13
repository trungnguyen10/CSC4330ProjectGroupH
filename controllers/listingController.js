const Listing = require(`${__dirname}/../models/listingModel`);
const Wishlist = require(`${__dirname}/../models/wishlistModel`);
const FilterFeatures = require(`${__dirname}/../utils/FilterFeatures`);
const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const AppError = require(`${__dirname}/../utils/appError`);

exports.getAllListings = catchAsync(async (req, res, next) => {
  const listings = await new FilterFeatures(Listing.find(), req.query)
    .filter()
    .sort()
    .pagenate().query;

  // set local variable for pug file
  res.locals.listings = listings;

  res.status(200).json({
    status: "success",
    results: listings.length,
    data: {
      listings,
    },
  });
});

exports.getListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(new AppError("Listing does not exist!", 404));

  res.status(200).json({
    status: "success",
    data: {
      listing,
    },
  });
});

exports.createListing = catchAsync(async (req, res, next) => {
  const listingInfo = { ...req.body };
  listingInfo.belongTo = req.user._id;

  const newListing = await Listing.create(listingInfo);

  res.status(201).json({
    status: "success",
    data: {
      Listing: newListing,
    },
  });
});

exports.updateListing = catchAsync(async (req, res, next) => {
  const item = await Listing.findById(req.params.id);
  if (!item)
    return next(new AppError("You are not the Owner of this Listing.", 404));

  const userID = req.user._id + "";

  let listingDataObj = { ...req.body };
  delete listingDataObj["belongTo"];

  if (userID === item.belongTo) {
    Object.assign(item, listingDataObj);
    item.save();
    res.status(200).json({
      status: "success",
      data: item,
    });
  } else
    return next(new AppError("You are not the Owner of this Listing.", 404));
});

exports.deleteListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(new AppError("Listing does not exist!", 404));
  const userID = req.user._id + "";
  if (userID === listing.belongTo) {
    await Listing.findByIdAndDelete(req.params.id);
    await Wishlist.deleteMany({ listing_id: req.params.id });
    res.status(200).json({
      status: "sucess",
    });
  } else
    return next(new AppError("You are not the Owner of this Listing.", 404));
});
