module.exports.createNewJob = (req, res, next) => {
    if(!req.body.tenCV)
    {
        req.flash("error", "Tên công việc không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.chiTietCV)
    {
        req.flash("error", "Chi tiết công việc không được để trống!");
        res.redirect("back");
        return;
    }
    if(req.body.ids == '[]')
    {
        req.flash("error", "Địa điểm công việc không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.luong)
    {
        req.flash("error", "Lương không được để trống!");
        res.redirect("back");
        return;
    }
    if(req.body.luong.trim().startsWith("-"))
    {
        req.flash("error", "Lương không hợp lệ!");
        res.redirect("back");
        return;
    } 
    if(!req.body.kinhNghiem)
    {
        req.flash("error", "Kinh nghiệm không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.hanChot)
    {
        req.flash("error", "Hạn chót không được để trống!");
        res.redirect("back");
        return;
    }

    const ngayTao = new Date(req.body.hanChot);
    const ngayHienTai = new Date();
    
    const soNgay = Math.floor((ngayTao - ngayHienTai) / (1000 * 60 * 60 * 24));

    if(soNgay < 0)
    {
        req.flash("error", "Ngày tạo không hợp lệ!");
        res.redirect("back");
        return;
    }

    next();
}