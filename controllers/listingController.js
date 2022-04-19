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

    const listingInfo = {...req.body};
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
  try{
    console.log(req.user);
    const item = await Listing.findById(req.params.id);
    
    if(req.user._id == req.body.belongTo){
    Object.assign(item, req.body);
    item.save();
    res.send({data: item});}
    else(res.status(404).send({ error: "You are not the Owner of this Listing."}))
    }
  catch{
    res.status(404).send({ error: "Listing Does Not Exist"});
  }
};

exports.deleteListing = async (req, res) => {
  try{
    console.log(req.user);
    const listing = await Listing.findById(req.params.id);

    if(req.user._id == req.body.belongTo){
    await listing.remove();
    
    res.send({data: true});
    }
  } catch {
    res.status(404).send({error: "Listing Does Not Exist"});
  }
};
