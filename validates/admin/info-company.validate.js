module.exports.editInfo = (req, res, next) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!req.body.tenCT.trim())
    {
        req.flash("error", "Tên không được để trống!");
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
    if(req.body.quyMo.trim().startsWith("-"))
    {
        req.flash("error", "Số lượng nhân viên không hợp lệ!");
        res.redirect("back");
        return;
    } 

    next();
}