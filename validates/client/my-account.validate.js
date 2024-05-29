module.exports.infoUser = (req, res, next) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!req.body.name.trim())
    {
        req.flash("error", "Tên không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.email.trim())
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.email.trim().match(emailRegex))
    {
        req.flash("error", "Email không đúng định dạng!");
        res.redirect("back");
        return;
    } 

    if(!req.body.ngaySinh)
    {
        req.flash("error", "Ngày sinh không được để trống!");
        res.redirect("back");
        return;
    }


    const ngaySinh = new Date(req.body.ngaySinh);
    const ngayHienTai = new Date();
    
    const soNgay = Math.floor((ngayHienTai - ngaySinh) / (1000 * 60 * 60 * 24));

    if(soNgay <= 0)
    {
        req.flash("error", "Ngày sinh không hợp lệ!");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.createCompany = (req, res, next) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!req.body.tenCT.trim())
    {
        req.flash("error", "Tên không được để trống!");
        res.redirect("back");
        return;
    }
    if(req.body.quyMo.trim().startsWith("-"))
    {
        req.flash("error", "Số lượng nhân viên không hợp lệ!");
        res.redirect("back");
        return;
    } 
    if(!req.body.diaDiem.trim())
    {
        req.flash("error", "Địa chỉ công ty không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.sdtCT.trim())
    {
        req.flash("error", "Số điện thoại không được để trống!");
        res.redirect("back");
        return;
    }
    if(req.body.sdtCT.trim().length != 10)
    {
        req.flash("error", "Số điện thoại không đủ 10 số!");
        res.redirect("back");
        return;
    }
    if(!req.body.emailCT.trim())
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.emailCT.trim().match(emailRegex))
    {
        req.flash("error", "Email không đúng định dạng!");
        res.redirect("back");
        return;
    } 

    next();
}