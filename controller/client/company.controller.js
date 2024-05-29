const CompanyModel = require("../../models/Company.model");
const JobModel = require("../../models/Job.model");
const timeApplyHelper = require("../../helpers/time-apply.helper")
const paginationHelper = require("../../helpers/pagination.helper")

//[GET]/companys
module.exports.index = async(req, res) => {
    try {
        var companies = await CompanyModel.getAllCompanies();
        var tenCT = "";
        var khuVuc;
        var query =``;
        
        if(req.query.tenCT)
        {
            tenCT = req.query.tenCT;
        }
    
        if(req.query.khuvuc)
        {
            khuVuc = req.query.khuvuc;
    
            if(khuVuc == 'kvuc')
            {
                query = `select * from CONGTY where (tenCT like N'%${tenCT}%')`;
            }
            else
            {
                query = `select * from CONGTY where (tenCT like N'%${tenCT}%') and (diaDiem like N'%${khuVuc}%')`;
                // console.log(query);
            }
    
            companies = await CompanyModel.getAllCompaniesBySearch(query);
        }

        const countCompany = companies.length;

        const objPagination = paginationHelper(req.query, countCompany);

        const startIndex = (objPagination.currentPage - 1) * objPagination.limitPerPage;
        const endIndex = startIndex + objPagination.limitPerPage;

        companies = companies.slice(startIndex, endIndex);
        
        res.render("client/pages/company/index",{
            title: "Trang công ty",
            companies: companies,
            pagination: objPagination
        })
    } catch (error) {
        res.redirect("back");
    }
}


//[GET] /companys/detail/:slug
module.exports.detail = async(req, res) => {
    const slugCom = req.params.slug;

    const company = await CompanyModel.getCompanyBySlug(slugCom);

    const inforAdmin = await CompanyModel.getInfoUserOfCompany(company.congTyId);

    const getJobs = await JobModel.getJobOfCompany(company.congTyId);
    const jobOfCompany = await timeApplyHelper.time(getJobs);

    res.render("client/pages/company/detail.pug", {
        company: company,
        inforAdmin: inforAdmin,
        jobOfCompany: jobOfCompany
    });
}