const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/job.controller");

const validate = require("../../validates/client/job-detail.validate");

const multer  = require('multer')

const storageMulter = require("../../helpers/storage-multer.helper");
  
const upload = multer({ storage: storageMulter() })


router.get("/", controller.getAllJobs);

router.get("/detail/:slug", controller.detail);

router.post("/apply-job/:maCV", upload.single('file'), validate.applyJob, controller.applyJob);

router.get("/applied/:userId", controller.jobApplied);


module.exports = router;