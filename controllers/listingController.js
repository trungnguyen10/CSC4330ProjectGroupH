 const Listing = require('./../models/listingModel');

  exports.getAllListings = async (req, res) => {
    try{
      const listings = await Listing.find();

      res.status(200).json({
        status: 'success',
        results: listings.length,
        data: {
          listings
        }
      });
    } catch(err){
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  
  
};

exports.getListing = async(req, res) => {
  try{
    const listing = await Listing.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        listing
      }
    });
  } catch (err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createListing = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newListing = await Listing.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        Listing: newListing
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

