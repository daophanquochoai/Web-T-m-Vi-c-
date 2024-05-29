const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller");
const validate = require("../../validates/client/user.validate");

router.get("/", controller.login);

router.post("/register", validate.register, controller.registerPost);

router.post("/login", validate.login, controller.loginPost);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot", validate.forgotPassword, controller.forgotPasswordPost);

router.get("/password/otp", controller.otpPassword);

router.post("/password/otp", validate.otpPassword, controller.otpPasswordPost);

router.get("/password/reset", controller.resetPassword);

router.post("/password/reset",validate.resetPassword, controller.resetPasswordPost);

router.get("/logout", controller.logout);

module.exports = router;