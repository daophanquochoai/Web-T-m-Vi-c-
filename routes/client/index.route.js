const homeRouter = require("./home.route");
const jobRouter = require("./job.route");
const companyRoute = require("./compay.route")
const userRoute = require("./user.route")
const myAccountRoute = require("./my-account.route");
const AnnounceRoute = require("./announce.route");

const authMiddleware = require("../../middleware/auth.middleware");
const navigationMenuMiddleware = require("../../middleware/navigationMenu");
const headerMenuMiddleware = require("../../middleware/headerUser.middware");

module.exports = (app) => {
    app.use(headerMenuMiddleware.infoUser);

    app.use("/", navigationMenuMiddleware.index, homeRouter);

    app.use("/jobs", navigationMenuMiddleware.index, jobRouter);

    app.use("/companys", navigationMenuMiddleware.index, companyRoute);

    app.use("/my-account",authMiddleware.requireAuth, myAccountRoute);

    app.use("/user", userRoute);

    app.use("/announce", authMiddleware.requireAuth, AnnounceRoute);


}
