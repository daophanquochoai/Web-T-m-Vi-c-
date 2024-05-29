const AnnounceModel = require("../models/Announce.model");
const CompanyModel = require("../models/Company.model");
const JobDetailModel = require("../models/Job-detail.model");
const he = require('he');

module.exports.clickButtonSubmit = async (req, res, jobDetail) => {
    _io.once("connection", async (socket) => {
        console.log("Kết nối socket thành công!");
    
        socket.on("COMPANY_SEND_ANNOUNCE", async (data) => {
            //check trước xem thử đã có người đó chưa

            // console.log(data);
            const userId = data.userId;
            const maCV = data.maCV;

            const userExist = await AnnounceModel.checkAnnounce(userId, maCV);
            if(!userExist)
            {
                socket.emit("SERVER_RETURN_EXIST_USER", {
                    type: data.type
                });

                // Lưu thông tin vào database
                let type = "0";
                if(data.type == "accept")
                {
                    type = "1";
                }

                data.thongBao = he.decode(data.thongBao);

                await AnnounceModel.insertAnnounce(maCV, userId, data.thongBao , type);

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
            
        })
        
    });
}

module.exports.clickButtonWatchCV = async (req, res, jobDetail) => {
    _io.once("connection", async (socket) => {
        socket.on("COMPANY_CLICK_CV_USER", async (data) => {
            console.log("//////////---------");
            console.log(data);
            await JobDetailModel.updateDaXemCV(data.maCTCV);

            socket.emit("SERVER_RETURN_CV_SEEN", {
                maCTCV: data.maCTCV
            })
        })
    });
}