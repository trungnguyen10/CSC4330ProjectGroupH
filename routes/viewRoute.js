const express = require("express");
const authenController = require(`${__dirname}/../controllers/authenController`);
const viewController = require(`${__dirname}/../controllers/viewController`);
const router = express.Router();

router.route("/").get(async (req, res) => {
  const isLoggedIn = await authenController.isLoggedIn(req, res);
  if (isLoggedIn) viewController.getHomePage(req, res);
  else viewController.getLoginForm(req, res);
});

router.route("/login").get(viewController.getLoginForm);
router.route("/signup").get(viewController.getSignupForm);
router.route("/homepage").get(viewController.getHomePage);

module.exports = router;
