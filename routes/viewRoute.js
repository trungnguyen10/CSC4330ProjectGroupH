const express = require("express");
const authenController = require(`${__dirname}/../controllers/authenController`);
const viewController = require(`${__dirname}/../controllers/viewController`);
const router = express.Router();

const isRedirected = async function (req, res) {
  const isLoggedIn = await authenController.isLoggedIn(req, res);
  if (isLoggedIn) {
    res.redirect("http://127.0.0.1:3000/homepage");
    return true;
  } else return false;
};

router.route("/").get(async (req, res) => {
  const redirected = await isRedirected(req, res);
  if (!redirected) viewController.getLoginForm(req, res);
});

router.route("/login").get(async (req, res) => {
  const redirected = await isRedirected(req, res);
  if (!redirected) viewController.getLoginForm(req, res);
});
router.route("/signup").get(async (req, res) => {
  const redirected = await isRedirected(req, res);
  if (!redirected) viewController.getSignupForm(req, res);
});
router.route("/homepage").get(async (req, res) => {
  const isLoggedIn = await authenController.isLoggedIn(req, res);
  if (!isLoggedIn) res.redirect("http://127.0.0.1:3000/login");
  else viewController.getHomePage(req, res);
});
router.route("/profile").get(async (req, res) => {
  const isLoggedIn = await authenController.isLoggedIn(req, res);
  console.log("made it to foward/profile");
  if (isLoggedIn) viewController.getProfileForm(req, res);
});

module.exports = router;
