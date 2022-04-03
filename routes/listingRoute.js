const express = require("express");
const listingController = require(`${__dirname}/../controllers/listingController`);

const router = express.Router();
router
    .route("/").get(listingController.getAllListings)
    .post(listingController.createListing);


router
  .route('/:id')
  .get(listingController.getListing)
  //.patch(listingController.updateListing)
  //.delete(listingController.deleteListing);
module.exports = router;
