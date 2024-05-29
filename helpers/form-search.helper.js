module.exports.search = (query) => {
    // lương
    let luong1, luong2;
    if(query.luong == "all")
    {
        luong1 = 0;
        luong2 = 1000;
    }
    else
    {
        luong1 = parseInt(query.luong.split("-")[0]);
        luong2 = parseInt(query.luong.split("-")[1]);
    }
    // kinh nghiệm
    let kn = "";
    let kinhNghiem = query.kinhnghiem;
    if(kinhNghiem == "all")
    {
        kn = '>= 0';
    }
    else if(kinhNghiem == "0")
    {
        kn = '= 0';
    }
    else if(kinhNghiem == "less1")
    {
        kn = '< 1';
    }
    else if(kinhNghiem == "1")
    {
        kn = '= 1';
    }
    else if(kinhNghiem == "2")
    {
        kn = '= 2';
    }
    else if(kinhNghiem == "3")
    {
        kn = '= 3';
    }
    else if(kinhNghiem == "4")
    {
        kn = '= 4';
    }
    else if(kinhNghiem == "5")
    {
        kn = '= 5';
    }
    else if(kinhNghiem == "over5")
    {
        kn = '> 5';
    }

    // vị trí
    let vitri = query.vitri;

    // khu vực
    let kv = query.khuvuc;

    let querySql = "";

    if(kv == "all")
    {
        querySql = `select * from CONGVIEC where (CONGVIEC.tenCV like '%${vitri}%') and (luong >= ${luong1} and luong <= ${luong2}) and (kinhNghiem ${kn})`;
    }
    else
    {
        kv = parseInt(kv);
        querySql = `select * from CONGVIEC, CONGVIEC_KHUVUC where (CONGVIEC.tenCV like '%${vitri}%') and (luong >= ${luong1} and luong <= ${luong2}) and (kinhNghiem ${kn}) and (CONGVIEC.maCV = CONGVIEC_KHUVUC.maCV) and (maKV = ${kv})`;       
    }

    // console.log(querySql);

    return querySql;
}