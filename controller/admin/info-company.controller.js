const CompanyModel = require("../../models/Company.model");
const slugHelper = require("../../helpers/convert-to-slug.helper");
const he = require('he');

//[GET] //manage/infoCompany/:congTyId
module.exports.index = async(req, res) => {

    const congTyId = req.params.congTyId;
    const company = await CompanyModel.getCompanyById(congTyId);

    console.log(company)

    res.render("admin/pages/infoCompany/index", {
        title: "Trang thông tin công ty",
        company
    })
}

//[GET] //manage/infoCompany/:congTyId/edit
module.exports.edit = async(req, res) => {

    const congTyId = req.params.congTyId;
    const company = await CompanyModel.getCompanyById(congTyId);

    res.render("admin/pages/infoCompany/edit", {
        title: "Trang chỉnh sửa thông tin công ty",
        company
    })
}

//[POST] //manage/infoCompany/:congTyId/edit
module.exports.editPost = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;

        const company = await CompanyModel.getCompanyById(congTyId);
        const oldEmail = company.emailCT;

        req.body.moTa = he.decode(req.body.moTa);
        req.body.quyMo = parseInt(req.body.quyMo);

        const slug = slugHelper.convertToSlug(req.body.tenCT);
        req.body.slug = slug;

        const infoCompany = req.body;



        if(oldEmail != infoCompany.emailCT)
        {
            const existCompany = await CompanyModel.getCompanyByEmail(infoCompany.emailCT);

            if(existCompany)
            {
                req.flash("error", "Email trùng, vui lòng nhập lại!");
                res.redirect("back");
                return;
            }
        }

        if(req.file && req.file.filename)
        {
            infoCompany.logo = `/uploads/${req.file.filename}`;
        }

        await CompanyModel.updateInfoCompany(infoCompany, congTyId);
        req.flash("success", "Cập nhật thông tin thành công!");
        res.redirect("back")
    } catch (error) {
        console.log(error);
        console.log("Lỗi trang cập nhật thông tin công ty - manage")
        res.redirect("/");
    }
}