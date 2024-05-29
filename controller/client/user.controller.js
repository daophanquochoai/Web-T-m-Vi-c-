const generateHelper = require("../../helpers/generate.helper");
const UserModel = require("../../models/User.model");
const ForgotPassword = require("../../models/ForgotPassword.model")
const md5 = require("md5");
const mailHelper = require("../../helpers/send-mail.helper"); 

//[GET] /user/login
module.exports.login = async (req, res) => {

    res.render("client/pages/user/login", {
        title: "Trang đăng kí - đăng nhập"
    });
}

//[POST] /user/register
module.exports.registerPost = async (req, res) => {

    console.log(req.body);

    const inforUser = {};

    inforUser.matKhau = md5(req.body.password);
    inforUser.token = generateHelper.generateRandomString(30);
    inforUser.ngaySinh = req.body.birthdate;
    inforUser.email = req.body["username-left"].trim();

    // check email trung
    const existUser = await UserModel.getUserByEmail(inforUser.email);

    if(existUser)
    {
        req.flash("error", "Email trùng, vui lòng nhập lại!");
        res.redirect("back");
        return;
    }

    inforUser.sdt = req.body.phone
    inforUser.gioiTinh = 1;
    if(req.body.gender == "nữ")
    {
        inforUser.gioiTinh = 0;
    }

    const hoTenArr = req.body.fullname.split(" ");
    inforUser.ten = hoTenArr[hoTenArr.length - 1].trim();
    inforUser.ho = req.body.fullname.slice(0, req.body.fullname.length - inforUser.ten.length -1).trim();

    //lưu thông tin user vào database
    await UserModel.insertUser(inforUser);

    res.cookie("tokenUser", inforUser.token);

    res.redirect("/")
}
//[POST] /user/login
module.exports.loginPost = async (req, res) => {

    const email = req.body["username_right"];
    const password = req.body.pw;

    const user = await UserModel.getUserByEmail(email)
    
    if(!user)
    {
        req.flash("error", "Email không chính xác!");
        res.redirect("back");
        return;
    }

    if(user.matKhau != md5(password))
    {
        req.flash("error", "Mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.token);

    res.redirect("/")
}

//[GET]/user/logout
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}

//[GET]user/password/forgot
module.exports.forgotPassword = (req, res) => {

    res.render("client/pages/user/forgot-password", {
        title: "Quên mật khẩu",
    });
}

//[POST]user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {

     // --------xóa những otp quá thời gian----
    await ForgotPassword.deleteOTPexpires();

    const email = req.body["username_right"];

    const user = UserModel.getUserByEmail(email);

    if(!user)
    {
        req.flash("error", "Email sai!");
        res.redirect("back");
        return;
    }

    const otp = generateHelper.generateRandomNumber(8);

    const objectForgot = {
        email: email,
        otp: otp,
    };



    // ---luu thong tin vao database
    await ForgotPassword.insertForgotPass(objectForgot.email, objectForgot.otp);

    //---gui ma otp tu dong
    const subject = `Mã OTP lấy lại lại mật khẩu`;
    const content = `Mã OTP của bạn là <b>${otp}</b>. Vui lòng không chia sẻ với bất cứ ai.`;

    mailHelper.sendMail(email, subject, content);


    res.redirect(`/user/password/otp?email=${email}`);
    // res.send("ok");
}

//[GET]user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;
  
    res.render("client/pages/user/otp-password", {
      title: "Nhập mã OTP",
      email: email,
    });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    await ForgotPassword.deleteOTPexpires();

    const result = await ForgotPassword.getOTP(email, otp);

    if(!result) {
        req.flash("error", "OTP không hợp lệ!");
        res.redirect("back");
        return;
    }

    const user = await UserModel.getUserByEmail(email);

    res.cookie("tokenUser", user.token);

    res.redirect(`/user/password/reset`);
};

//[GET]user/password/reset
module.exports.resetPassword = async (req, res) =>{ 
    res.render("client/pages/user/reset-password", {
      title: "Tạo mật khẩu mới",
    });
};

//[POST]user/password/reset
module.exports.resetPasswordPost = async (req, res) =>{ 
    try {
        const tokenUser = req.cookies.tokenUser;
        if(tokenUser)
        {
            const newPassword = md5(req.body.password);
            await UserModel.updateMatKhau(newPassword, tokenUser);
        }
        else
        {
            req.flash("error", "Không hợp lệ");
            return;
        }
        
    } catch (error) {
        console.log(error);
    }
    

    res.redirect("/");
};
