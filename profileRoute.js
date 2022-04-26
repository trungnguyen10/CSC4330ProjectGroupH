const express = require("express");
const userController = require(`${__dirname}/../controllers/userController`);
const authenController = require(`${__dirname}/../controllers/authenController`);
const listingController = require(`${__dirname}/../controllers/listingController`);                    
const router = express.Router();

router
  .route("/")
  .get(authenController.protect, listingController.findAllListingbyUserId);
  //.post(authenController.protect, listingController.createListing);

// router
//   .route("/sortByTime")
//   .get(authenController.protect, sort(listingController.getAllListings));



// router
//   .route("/:id")
//   .get(authenController.protect, listingController.getListing)
//   .patch(authenController.protect, listingController.updateListing)
//   .delete(authenController.protect, listingController.deleteListing);
 module.exports = router;
