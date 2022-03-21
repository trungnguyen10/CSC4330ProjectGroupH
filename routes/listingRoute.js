const express = require("express");
const listingController = require(`${__dirname}/../controllers/listingController`);

const router = express.Router();
router.route("/").get(listingController.getListing);

module.exports = router;
