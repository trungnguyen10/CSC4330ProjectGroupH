const Listing = require(`${__dirname}/../models/listingModel`);
const FilterFeatures = require(`${__dirname}/../utils/FilterFeatures`);

exports.getAllListings = async (req, res) => {
  try {
    const listings = await new FilterFeatures(Listing.find(), req.query)
      .filter()
      .sort()
      .pagenate().query;

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
    console.log(req.user);
    const newListing = await Listing.create(req.body);

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

exports.updateListing = function (req, res) {};

exports.deleteListing = function (req, res) {};
