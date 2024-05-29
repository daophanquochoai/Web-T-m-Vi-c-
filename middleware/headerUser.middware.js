const UserModel = require("../models/User.model");
const CompanyModel = require("../models/Company.model");
const AnnounceModel = require("../models/Announce.model");
const JobModel = require("../models/Job.model");
const timeHelper = require("../helpers/date.helper");

module.exports.infoUser = async(req, res, next) => {
    const token = req.cookies.tokenUser;

    if(token)
    {
        const user = await UserModel.getUserByToken(token);
        if(user)
        {
            user.hoVaTen = user.ho + " " + user.ten;
            
            user.ngaySinh = timeHelper.getDate(user.ngaySinh);

            // ---- cong ty neu co ----
            const company = await CompanyModel.getInfoCompanyByIdUser(user.userId);
            if(company)
            {
                user.congTyId = company.congTyId; 
            }

            // console.log(user)

            
            // ---announce of user---
            const announces = await AnnounceModel.getAnnounceOfUser(user.userId);   
            if(announces)
            {
                for (const announce of announces) {
                    const infoCT_CV = await CompanyModel.getCompanyByMaCV(announce.maCV);
                    announce.infoCT_CV = infoCT_CV;
                    announce.thoiGianGui = timeHelper.getTime(announce.thoiGianGui);   // -> "2/1/2013 7:37:08 AM"
                }
            }

            const SoLuongChuaXem = await AnnounceModel.countAnnounceNotSeenOfUser(user.userId);
            announces.SoLuongChuaXem = SoLuongChuaXem.soluong;

            res.locals.User = user;

            res.locals.Announces = announces.reverse();

            next();
            return;
        }
    }

    // nếu không đăng nhập hoặc sai token
    next();
} 