const CompanyModel = require("../../models/Company.model");
const JobModel = require("../../models/Job.model");
const JobDetailModel = require("../../models/Job-detail.model");


//[GET]/manage/dashboard/:congTyId
module.exports.index = async(req, res) => {
    try {

        const congTyId = req.params.congTyId;

        const soLuongDangTuyen = await JobModel.countJobDangTuyen(congTyId);
        const soLuongDungTuyen = await JobModel.countJobDungTuyen(congTyId);
        const soluongJob = await JobModel.countJob(congTyId);

        const soLuongCVDaXem = await JobDetailModel.countCVDaXem(congTyId);
        const soLuongCVChuaXem = await JobDetailModel.countCVChuaXem(congTyId);
        const soLuongCV = await JobDetailModel.countCV(congTyId);

        const company = await CompanyModel.getCompanyById(congTyId);

        res.render("admin/pages/dashboard/index", {
            title: "Trang tổng quan",
            company: company,
            soLuongDangTuyen,
            soLuongDungTuyen,
            soluongJob,
            soLuongCVDaXem,
            soLuongCVChuaXem,
            soLuongCV
        })
    } catch (error) {
        res.redirect("/")
    }

    
}