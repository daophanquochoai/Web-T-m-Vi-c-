const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/announce.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.get("/:maCV/:userId", authMiddleware.requireAuthUser, controller.index);

module.exports = router;