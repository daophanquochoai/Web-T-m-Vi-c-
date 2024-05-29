module.exports.applyJob = (req, res, next) => {

    if(!req.file || !req.file.filename)
    {
        req.flash("error", "File CV không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.khuVucUT)
    {
        req.flash("error", "Khu vực ứng tuyển không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}