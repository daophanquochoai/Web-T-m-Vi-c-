const AnnounceModel = require("../../models/Announce.model");
const CompanyModel = require("../../models/Company.model");
const JobModel = require("../../models/Job.model");
const systemConfig = require("../../config/system");
const JobDetailModel = require("../../models/Job-detail.model");


// [POST] /manage/anounce/:congTyId/:maCV/:userId
module.exports.index = async (req, res) => {

    const maCV = req.params.maCV;
    const userId = req.params.userId;
    const congTyId = req.params.congTyId;

    //check trước xem thử đã có người đó chưa
    const userExist = await AnnounceModel.checkAnnounce(userId, maCV);
    if(userExist)
    {
        req.flash("error", "Không thể gửi thêm thông báo!");
        res.redirect("back");
        return;
    }

    // SocketIO
    _io.once("connection", async (socket, check) => {
        console.log("Kết nối socket thành công!");

        //check trước xem thử đã có người đó chưa
        const userExist = await AnnounceModel.checkAnnounce(userId, maCV);
        if(!userExist)
        {
            
            // Lưu thông tin vào database
            let type = "0";
            if(req.body.type == "accept")
            {
                type = "1";
            }
            await AnnounceModel.insertAnnounce(maCV, userId, req.body.thongBao, type);

            // ----trả ra giao diện real-time ----
            const infoCT_CV = await CompanyModel.getCompanyByMaCV(maCV);

            socket.broadcast.emit("SERVER_SEND_ANNOUNCE", {
                userId: userId,
                maCV: maCV,
                infoCT_CV: infoCT_CV
            });

            // ---trả ra số lượng thông báo chưa xem---
            const soLuongChuaXem = await AnnounceModel.countAnnounceNotSeenOfUser(userId);
            socket.broadcast.emit("SERVER_SEND_LENGTH_ANNOUNCE_NOTSEEN", {
                userId: userId,
                soLuongChuaXem: soLuongChuaXem.soluong
            });
        }
    });
    // End SocketIO
    

    req.flash("success", "Đã chấp nhận CV");
    res.redirect("/");
};