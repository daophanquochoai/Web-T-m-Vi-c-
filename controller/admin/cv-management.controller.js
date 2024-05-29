const CompanyModel = require("../../models/Company.model");
const JobModel = require("../../models/Job.model");
const JobDetailModel = require("../../models/Job-detail.model");
const UserModel = require("../../models/User.model");
const AnnounceModel = require("../../models/Announce.model");
const AreaModel = require("../../models/Area.model");
const selectionSortHelper = require("../../helpers/selection-sort.helper");
const filterStatusHelper = require("../../helpers/filter-status.helper");
const paginationHelper = require("../../helpers/pagination.helper");
const cvSocket = require("../../socket/cv-announce-admin.socket");

//[GET] /manage/cv-managemant/:congTyId
module.exports.index = async(req, res) => {
    try {
        
        const congTyId = req.params.congTyId;

        // socket
        cvSocket.clickButtonWatchCV();
        // socket

        // -- Lấy danh sách mã công việc của công ty đó
        const jobOfCompany = await JobModel.getJobOfCompany(congTyId);
        let listMaCV = jobOfCompany.map(job => job.maCV);

        //--- Lấy CV đã ứng tuyển thuộc công việc của công ty đó
        let jobsDetail = [];
        const datas = await JobDetailModel.getAllJobDetails();
        datas.forEach(data => {
            if(listMaCV.includes(data.maCV))
            {
                jobsDetail.push(data);
            }
        });

        
        // gộp thông tin để trả ra giao diện
    
        for (const jobDetail of jobsDetail) {
            const infoJob = await JobModel.getJobNameByMaCV(jobDetail.maCV);
            const infoUser = await UserModel.getInfoUserByUserId(jobDetail.userId);
            const infoArea = await AreaModel.getAreasWithMaKV(jobDetail.khuVucUT);
            const announce = await AnnounceModel.getAnnounce(jobDetail.userId, jobDetail.maCV);

            jobDetail.infoJob = infoJob;
            jobDetail.infoUser = infoUser;
            jobDetail.infoArea = infoArea;
            jobDetail.announce = (announce ? "1" : "0");
        }

        const filterStatus = filterStatusHelper.cv(req.query);

        if(req.query.status)
        {
            const status = req.query.status;
            jobsDetail = filterStatusHelper.cvList(status, jobsDetail);
        }

        // ---search---
        let keyword = "";

        if(req.query.keyword)
        {
            keyword = req.query.keyword;
            jobsDetail = jobsDetail.filter(jobDetail => jobDetail.infoUser.hoTen.toLowerCase().includes(keyword.toLowerCase()));
        }

        //--mặc định ngày gửi mới nhất ~~ ngày gửi giảm dần
        jobsDetail.sort((a, b) => new Date(b.thoiGianNop) - new Date(a.thoiGianNop));

        const sortObj = selectionSortHelper.cv();

        if(req.query.sortKey && req.query.sortValue)
        {
            const sortKey = req.query.sortKey;
            const sortValue = req.query.sortValue;

            jobsDetail = selectionSortHelper.cvSort(sortKey, sortValue, jobsDetail);
        }

        // ----pagination---
        const countCV = jobsDetail.length;

        const objPagination = paginationHelper(req.query, countCV);

        const startIndex = (objPagination.currentPage - 1) * objPagination.limitPerPage;
        const endIndex = startIndex + objPagination.limitPerPage;

        jobsDetail = jobsDetail.slice(startIndex, endIndex);


        res.render("admin/pages/cv-management/index", {
            title: "Trang danh sách cv",
            jobsDetail: jobsDetail,
            filterStatus,
            sortObj,
            pagination: objPagination,
            keyword
        })

    } catch (error) {
        console.log(error);
        console.log("Lỗi trang cv-management");
        res.redirect("/");   
    }
}

//[GET] /manage/cv-managemant/:congTyId/detail/:maCTCV
module.exports.detailCV = async(req, res) => {
    try {

        const congTyId = req.params.congTyId;
        
        const maCTCV = req.params.maCTCV;

        JobDetailModel.updateDaXemCV(maCTCV);

        const jobDetail = await JobDetailModel.getJobDetailByMaCTCV(maCTCV);

        const infoJob = await JobModel.getJobNameByMaCV(jobDetail.maCV);
        const infoUser = await UserModel.getInfoUserByUserId(jobDetail.userId);
        const infoArea = await AreaModel.getAreasWithMaKV(jobDetail.khuVucUT);

        jobDetail.infoJob = infoJob;
        jobDetail.infoUser = infoUser;
        jobDetail.infoArea = infoArea;


        // -----socket----
        cvSocket.clickButtonSubmit(req, res, jobDetail);
        // -----socket----

        const announce = await AnnounceModel.checkAnnounce(jobDetail.userId, jobDetail.maCV);

        res.render("admin/pages/cv-management/detail", {
            title: "Trang danh sách cv",
            jobDetail: jobDetail,
            congTyId,
            announce: JSON.stringify(announce)
        })

    } catch (error) {
        console.log("Lỗi trang chi tiết cv");
        res.redirect("/");   
    }
}

//[GET] /manage/cv-managemant/:congTyId/delete/:maCTCV
module.exports.deleteCV = async(req, res) => {
    try {

        const congTyId = req.params.congTyId;
        
        const maCTCV = req.params.maCTCV;

        const jobDetail = await JobDetailModel.updateDelete(maCTCV);

        console.log("mã chi tiết công việc: ", maCTCV)

        // -----socket----
        // cvSocket.clickButtonSubmit(req, res, jobDetail);
        // -----socket----

        res.redirect("back");

    } catch (error) {
        console.log("Lỗi trang chi tiết cv");
        res.redirect("/");   
    }
}

