module.exports.register = (req, res, next) => {

    if(!req.body.fullname)
    {
        req.flash("error", "Tên không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body["username-left"])
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.password)
    {
        req.flash("error", "Mât khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.phone)
    {
        req.flash("error", "Số điện thoại không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.gender)
    {
        req.flash("error", "Giới tính không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.birthdate)
    {
        req.flash("error", "Ngày sinh không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}


module.exports.login = (req, res, next) => {

    if(!req.body["username_right"])
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.pw)
    {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.forgotPassword = (req, res, next) => {

    if(!req.body["username_right"])
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }
    next();
}

module.exports.otpPassword = (req, res, next) => {

    if(!req.body.otp)
    {
        req.flash("error", "OTP không được để trống!");
        res.redirect("back");
        return;
    }
    
    next();
}

module.exports.resetPassword = (req, res, next) => {

    if(!req.body.password)
    {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.passwordConfirm)
    {
        req.flash("error", "Xác nhận mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    if(req.body.passwordConfirm != req.body.password)
    {
        req.flash("error", "Xác nhận mật khẩu không đúng!");
        res.redirect("back");
        return;
    }
    
    next();
}

