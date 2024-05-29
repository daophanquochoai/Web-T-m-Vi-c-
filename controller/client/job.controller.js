const JobModel = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");
const JobDetailModel = require("../../models/Job-detail.model");
const JobAreaModel = require("../../models/Job-area.model");
const AnnounceModel = require("../../models/Announce.model");
const timeApplyHelper = require("../../helpers/time-apply.helper")
const searchFormHelper = require("../../helpers/form-search.helper")
const paginationHelper = require("../../helpers/pagination.helper")
const filterStatusHelper = require("../../helpers/filter-status.helper");
const selectionSortHelper = require("../../helpers/selection-sort.helper");
const applyAnimationHelper = require("../../helpers/apply-animation.helper");
const timeHelper = require("../../helpers/date.helper");

// [GET] /jobs
module.exports.getAllJobs = async (req, res) => {
    try {
        var getJobs = [];

        // console.log(req.query);

        if('vitri' in req.query)
        {
            const query = searchFormHelper.search(req.query);
            getJobs = await JobModel.getJobsByForm(query);
        }
        else
        {
            getJobs = await JobModel.getAllJobs();
        }

        const countJob = getJobs.length;

        const objPagination = paginationHelper(req.query, countJob);
        
        // sap xep theo ngay tao
        getJobs.sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao));

        const startIndex = (objPagination.currentPage - 1) * objPagination.limitPerPage;
        const endIndex = startIndex + objPagination.limitPerPage;

        let jobs = getJobs.slice(startIndex, endIndex);

        jobs = await timeApplyHelper.time(jobs);

        const filterStatus = filterStatusHelper.job(req.query);

        // ---filter---
        if(req.query.status)
        {
            const status = req.query.status;
            jobs = filterStatusHelper.jobList(status, jobs);
        }

        // --sort---
        const sortObj = selectionSortHelper.job();

        if(req.query.sortKey && req.query.sortValue)
        {
            const sortKey = req.query.sortKey;
            const sortValue = req.query.sortValue;

            jobs = selectionSortHelper.jobSort(sortKey, sortValue, jobs);
        }

        // ----xử lý ứng tuyển -----
        await applyAnimationHelper(jobs, res);
        // ----xử lý ứng tuyển -----
        

        res.render("client/pages/job/index", {
            title: "Trang danh sách công việc",
            jobs: jobs,
            pagination: JSON.stringify(objPagination),
            filterStatus,
            sortObj,
        })
    } catch (error) {
        res.redirect("back")
    }
}

//[GET] /jobs/detail/:slug
module.exports.detail = async(req, res) => {
    try {
        var userId = ( res.locals.User ? res.locals.User.userId : "");

        const slugJob = req.params.slug;

        const job = await JobModel.getJobBySlug(slugJob);

        const company = await CompanyModel.getCompanyById(job.congTyId);

        const getJobs = await JobModel.getJobOfCompany(job.congTyId);

        const jobOfCompany = await timeApplyHelper.time(getJobs);

        const jobAreas = await JobAreaModel.getAreaOfJob(slugJob);


        //lay congTyId của user nếu có
        var congTyUserId = -1;  // chưa đăng nhập thì không có công ty
        var applied = 100; // chưa đăng nhập thì phải đăng nhập trước khi ứng tuyển 

        if(userId)  // nếu có đăng nhập
        {
            let congTyUser = await CompanyModel.getInfoCompanyByIdUser(userId);

            let jobDetail = await JobDetailModel.getDetailJobByMaCV_UserId(job.maCV, userId);
            
            if(jobDetail.length > 0)
            {
                applied = 1;
            }
            else
            {
                applied = 0;
            }

            if(congTyUser)
            {
                congTyUserId = congTyUser.congTyId;
            }
        }        

        res.render("client/pages/job/detail.pug", {
            job: job,
            company: company,
            jobOfCompany: jobOfCompany,
            jobAreas: jobAreas,
            congTyUserId: congTyUserId,
            applied: applied
        });
    } catch (error) {
        console.log("Công việc đã bị xóa Hoặc Slug bị sai");
        res.redirect("/");
    }
}

//[POST] /jobs/apply-job/:maCV
module.exports.applyJob = async(req, res) => {

    try {
        const maCV = req.params.maCV;

        const job = await JobModel.getJobNameByMaCV(maCV);

        const userId = res.locals.User.userId;
        const jobDetail = {};

        jobDetail.maCV = maCV;
        jobDetail.userId = userId;
        jobDetail.pdf = `/uploads/${req.file.filename}`;
        jobDetail.khuVucUT = req.body.khuVucUT;

        console.log(jobDetail);

        await JobDetailModel.insertJobDetail(jobDetail);

        res.redirect(`/jobs/detail/${job.slug}`);
    
        // res.render("client/pages/job/test", {
        //     title: "file"
        // });
    } catch (error) {
            console.log("lỗi ở nộp đơn")
            redirect("/");
    }
}

//[GET] /jobs/applied/:userId
module.exports.jobApplied = async(req, res) => {
    try {
        const userId = req.params.userId;
        // ---announce of user---
        let announces = await AnnounceModel.getAnnounceOfUser(userId);   
        if(announces)
        {
            for (const announce of announces) {
                const infoCT_CV = await CompanyModel.getCompanyByMaCV(announce.maCV);
                announce.infoCT_CV = infoCT_CV;
                announce.thoiGianGui = timeHelper.getDate2(announce.thoiGianGui);   // -> "2/1/2013 7:37:08 AM"

                const jobDetail = await JobDetailModel.getDetailJobByMaCV_UserId(announce.maCV, announce.userId);
                const thoiGianNopDon = timeHelper.getDate2(jobDetail[0].thoiGianNop);
                announce.thoiGianNop = thoiGianNopDon;
            }
        }

        const countAnnounces = announces.length;

        const objPagination = paginationHelper(req.query, countAnnounces);

        const startIndex = (objPagination.currentPage - 1) * objPagination.limitPerPage;
        const endIndex = startIndex + objPagination.limitPerPage;

        announces = announces.reverse();

        announces = announces.slice(startIndex, endIndex);

        res.render("client/pages/job/applied", {
            title: "Trang danh sách công việc đã nộp",
            announces: announces,
            pagination: JSON.stringify(objPagination),
        })
    } catch (error) {
        console.log("xem danh sách công việc đã nộp đơn");
        console.log(error);
    }
}
