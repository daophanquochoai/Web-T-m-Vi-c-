module.exports.job = (query) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hết hạn",
            status: "expired",
            class: ""
        },
        {
            name: "Chưa hết hạn",
            status: "unexpired",
            class: ""
        },
        {
            name: "Dừng tuyển",
            status: "inactive",
            class: ""
        },
        {
            name: "Đang tuyển",
            status: "active",
            class: ""
        },
    ]

    if(query.status)
    {
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "active";
    }
    else
    {
        filterStatus[0].class = "active";
    }

    return filterStatus;
}

module.exports.jobList = (status, jobs) => {
    switch (status) {
        case "expired":
            jobs = jobs.filter(item => item.hetHan == true)
            break;
        case "unexpired":
            jobs = jobs.filter(item => item.hetHan == false)
            break;
        case "inactive":
            jobs = jobs.filter(item => item.trangThai == false)
            break;
        case "active":
            jobs = jobs.filter(item => item.trangThai == true)
            break;
    
        default:
            break;
    }

    return jobs;
}

// ------------cv-management----------
module.exports.cv = (query) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Đã xem",
            status: "seen",
            class: ""
        },
        {
            name: "Chưa xem",
            status: "not-seen",
            class: ""
        },
    ]

    if(query.status)
    {
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "active";
    }
    else
    {
        filterStatus[0].class = "active";
    }

    return filterStatus;
}

module.exports.cvList = (status, jobsDetail) => {
    switch (status) {
        case "seen":
            jobsDetail = jobsDetail.filter(item => item.daXem == true)
            break;
        case "not-seen":
            jobsDetail = jobsDetail.filter(item => item.daXem == false)
            break;

        default:
            break;
    }

    return jobsDetail;
}