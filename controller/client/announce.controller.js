const AnnounceModel = require("../../models/Announce.model");
const UserModel = require("../../models/User.model");
const JobModel = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");
const timeHelper = require("../../helpers/date.helper");
const announceSocket = require("../../socket/announce-client.socket");


//[GET]/announce/:maCV/:userId
module.exports.index = async(req, res) => {
    try {
        const maCV = req.params.maCV;
        const userId = req.params.userId;

        // SocketIO
        announceSocket();
        // End SocketIO

        const announce = await AnnounceModel.getAnnounce(userId, maCV);
        announce.thoiGianGui = timeHelper.getDate2(announce.thoiGianGui);

        const user = await UserModel.getInfoUserByUserId(userId);
        const job = await CompanyModel.getCompanyByMaCV(maCV);

        job.tenCT = job.tenCT.toUpperCase();

        console.log(user);
        console.log(job);

        res.render("client/pages/announce/index", {
            title: "Trang kết quả",
            announce: announce,
            job: job,
            user: user
        })
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}
