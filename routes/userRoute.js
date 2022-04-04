const express = require("express");
const userController = require(`${__dirname}/../controllers/userController`);
const authenController = require(`${__dirname}/../controllers/authenController`);

const router = express.Router();

router.route("/signup").get().post(authenController.signup);

router.route("/login").get().post(authenController.login);

router.route("/").get(userController.getUser);

module.exports = router;
