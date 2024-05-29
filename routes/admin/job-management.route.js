const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/job-management.controller");

const authMiddleware = require("../../middleware/admin/auth.middleware");

const validate = require("../../validates/admin/job-management.validate");

router.get("/:congTyId", authMiddleware.requireAuthManage, controller.index);

router.get("/:congTyId/create", authMiddleware.requireAuthManage, controller.create);

router.post("/:congTyId/create", authMiddleware.requireAuthManage, validate.createNewJob, controller.createPost);

router.get("/:congTyId/detail/:slugCV", authMiddleware.requireAuthManage, controller.detail);

router.get("/:congTyId/edit/:slugCV", authMiddleware.requireAuthManage, controller.edit);

router.post("/:congTyId/edit/:maCV",authMiddleware.requireAuthManage, validate.createNewJob, controller.postEdit);

router.patch("/:congTyId/:changeStatus/:maCV",authMiddleware.requireAuthManage, controller.changStatus);

router.patch("/:congTyId/delete/job/:slug",authMiddleware.requireAuthManage, controller.delete);

module.exports = router;