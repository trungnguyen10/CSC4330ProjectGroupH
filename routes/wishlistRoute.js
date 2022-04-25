const express = require("express");
const wishlistController = require(`${__dirname}/../controllers/wishlistController`);
const authenController = require(`${__dirname}/../controllers/authenController`);

const router = express.Router();
router
  .route("/")
  .get(authenController.protect, wishlistController.getWishlist)
  .post(authenController.protect, wishlistController.createWishlist);

router
  .route("/:id")
  .delete(authenController.protect, wishlistController.deleteListingInWishlist);

module.exports = router;
