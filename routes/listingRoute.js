const express = require("express");
const listingController = require(`${__dirname}/../controllers/listingController`);
const authenController = require(`${__dirname}/../controllers/authenController`);

const router = express.Router();
router
  .route("/")
  .get(authenController.protect, listingController.getAllListings)
  .post(listingController.createListing);

<<<<<<< HEAD
  router.route("/sortByTime")
  .get(authenController.protect, sort(listingController.getAllListings));
router.route("/:id")
.get(listingController.getListing)

=======
// router
//   .route("/sortByTime")
//   .get(authenController.protect, sort(listingController.getAllListings));
router.route("/:id").get(listingController.getListing);
// .patch(listingController.updateListing)
// .delete(listingController.deleteListing);
>>>>>>> c78be089208204b9a4c126db0c5de5f3fed415ef
module.exports = router;
