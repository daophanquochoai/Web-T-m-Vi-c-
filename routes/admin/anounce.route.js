const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/announce.controller");

router.post("/:congTyId/:maCV/:userId", controller.index);

module.exports = router;