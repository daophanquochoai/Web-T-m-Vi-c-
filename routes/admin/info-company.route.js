const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/info-company.controller");
const multer  = require('multer')
const validate = require("../../validates/admin/info-company.validate");
const authMiddleware = require("../../middleware/admin/auth.middleware");

const storageMulter = require("../../helpers/storage-multer.helper");
  
const upload = multer({ storage: storageMulter() })

router.get("/:congTyId", authMiddleware.requireAuthManage, controller.index);

router.get("/:congTyId/edit", authMiddleware.requireAuthManage, controller.edit);

router.post("/:congTyId/edit", authMiddleware.requireAuthManage, upload.single('logo'), validate.editInfo, controller.editPost);


module.exports = router;