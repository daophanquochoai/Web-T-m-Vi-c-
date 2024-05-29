const dashboardRoute = require("./dashboard.route");
const jobManagementRoute = require("./job-management.route");
const cvManagementRoute = require("./cv-management.route");
const infoCompanyRoute = require("./info-company.route");
const announceRoute = require("./anounce.route");
const authMiddleware = require("../../middleware/admin/auth.middleware");
const systemConfig = require("../../config/system");

module.exports = (app) => {
    const prefixAdmin = systemConfig.prefixAdmin;

    app.use(`/${prefixAdmin}/dashboard`, authMiddleware.requireAuth, dashboardRoute);

    app.use(`/${prefixAdmin}/job-management`, authMiddleware.requireAuth, jobManagementRoute);

    app.use(`/${prefixAdmin}/cv-management`, authMiddleware.requireAuth, cvManagementRoute);

    app.use(`/${prefixAdmin}/infoCompany`,authMiddleware.requireAuth, infoCompanyRoute);

    app.use(`/${prefixAdmin}/announce`, authMiddleware.requireAuth, announceRoute);
}
