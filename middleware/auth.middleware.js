const UserModel = require("../models/User.model");
const CompanyModel = require("../models/Company.model");

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.tokenUser) {
        res.redirect(`/user?view=login`);
        return;
    }

    try {
        const user = await UserModel.getUserByToken(req.cookies.tokenUser);
        
        if (!user) {
            res.redirect(`/user?view=login`);
            return;
        }

        // res.locals.User = user; // nếu lưu User này thì làm mất User bên trang chủ, User ở đó tích họp nhiều cái
        
        next();
    } catch (error) {
        res.redirect(`/user?view=login`);
    }
}

module.exports.requireAuthUser = async (req, res, next) => {
    try {
        const user = res.locals.User;

        // kiểm tra xem công ty đó có do người này quản lý hay không
        const userIdParams = parseInt(req.params.userId);

        console.log("-------------------------");

        if(user.userId != userIdParams)
        {
            res.redirect("/");
        }

        next();
    } catch (error) {
        res.redirect(`/user?view=login`);
    }
}