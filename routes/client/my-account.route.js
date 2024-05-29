const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/my-account.controller");
const validate = require("../../validates/client/my-account.validate")

const multer  = require('multer')

const storageMulter = require("../../helpers/storage-multer.helper");
  
const upload = multer({ storage: storageMulter() })



router.get("/", controller.index);

router.post("/edit/info-user/:userId", validate.infoUser, controller.editPost);

router.post("/edit/avatar-user/:userId",upload.single('avatar'), controller.editAvatar);

router.post("/edit/info-company/:companyId", upload.single('logo'), validate.createCompany, controller.editCompanyInfo);

router.post("/create/company", upload.single('logo'), validate.createCompany, controller.createCompany);


module.exports = router;