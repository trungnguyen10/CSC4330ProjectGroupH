const express = require("express");
const authenController = require(`${__dirname}/../controllers/authenController`);
const router = express.Router();

router.route("/").get(async (req, res) => {
  const isLoggedIn = await authenController.isLoggedIn(req, res);
  if (isLoggedIn) res.render("homepage");
  else res.render("login");
});

router.get("/login", (req, res) => res.render("login"));
router.get("/signup", (req, res) => res.render("signup"));

module.exports = router;
