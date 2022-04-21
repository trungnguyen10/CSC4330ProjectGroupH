const express = require("express");
const listingController = require(`${__dirname}/../controllers/listingController`);
const authenController = require(`${__dirname}/../controllers/authenController`);

const router = express.Router();
router
  .route("/")
  .get(authenController.protect, listingController.getAllListings)
  .post(authenController.protect, listingController.createListing);

// router
//   .route("/sortByTime")
//   .get(authenController.protect, sort(listingController.getAllListings));
router
  .route("/:id")
  .get(authenController.protect, listingController.getListing)
  .patch(authenController.protect, listingController.updateListing)
  .delete(authenController.protect, listingController.deleteListing);
module.exports = router;
