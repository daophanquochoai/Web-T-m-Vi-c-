const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/dashboard.controller");
const authMiddleware = require("../../middleware/admin/auth.middleware");

router.get("/:congTyId", authMiddleware.requireAuthManage, controller.index);

module.exports = router;