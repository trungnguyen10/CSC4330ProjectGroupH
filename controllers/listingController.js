const Listing = require(`${__dirname}/../models/listingModel`);
const Wishlist = require(`${__dirname}/../models/wishlistModel`);
const FilterFeatures = require(`${__dirname}/../utils/FilterFeatures`);

exports.getAllListings = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.toString(),
    });
  }
};

exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        listing,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.toString(),
    });
  }
};

exports.createListing = async (req, res) => {
  try {
    const listingInfo = { ...req.body };
    listingInfo.belongTo = req.user._id;

    const newListing = await Listing.create(listingInfo);

    res.status(201).json({
      status: "success",
      data: {
        Listing: newListing,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.toString(),
    });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const item = await Listing.findById(req.params.id);

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
      res.status(404).send({ error: "You are not the Owner of this Listing." });
  } catch {
    res.status(404).send({ error: "Listing Does Not Exist" });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const userID = req.user._id + "";

    const listing = await Listing.findById(req.params.id);

    if (userID === listing.belongTo) {
      await Listing.findByIdAndDelete(req.params.id);
      await Wishlist.deleteMany({ listing_id: req.params.id });
      res.status(200).json({
        status: "sucess",
      });
    } else
      res.status(404).send({ error: "You are not the Owner of this Listing." });
  } catch (err) {
    res.status(404).send({ error: err.toString() });
  }
};
