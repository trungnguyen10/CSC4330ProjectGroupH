const express = require("express");
const userController = require(`${__dirname}/../controllers/userController`);
const authenController = require(`${__dirname}/../controllers/authenController`);

const router = express.Router();

router.route("/signup").post(authenController.signup);
router.route("/login").post(authenController.login);
router.route("/logout").get(authenController.logout);
router
  .route("/updatepassword")
  .patch(authenController.protect, authenController.updatePassword);
router.route("/:id").get(userController.getUser);

module.exports = router;
