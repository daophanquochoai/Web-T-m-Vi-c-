
module.exports.job = () => {
    const sortObj = [
        {
            name: "Ngày tạo giảm dần",
            value: "ngayTao-desc",
        },
        {
            name: "Ngày tạo tăng dần",
            value: "ngayTao-asc",
        },
        {
            name: "Tên công việc giảm dần ",
            value: "tenCV-desc",
        },
        {
            name: "Tên công việc tăng dần ",
            value: "tenCV-asc",
        },
    ]

    return sortObj;
}


module.exports.jobSort = (sortKey, sortValue, jobs) => {
    if (sortKey === "tenCV") 
        {
        if (sortValue === "asc") 
        {
            jobs.sort((a, b) => {
                if (a.tenCV.toLowerCase() < b.tenCV.toLowerCase()) return -1;
                if (a.tenCV.toLowerCase() > b.tenCV.toLowerCase()) return 1;  // nếu tên công việc đứng trước mà lớn hơn thì đổi chỗ  ---> mảng tăng dần
                return 0;
            });
        } 
        else if (sortValue === "desc") 
        {
            jobs.sort((a, b) => {
                if (a.tenCV.toLowerCase() > b.tenCV.toLowerCase()) return -1;
                if (a.tenCV.toLowerCase() < b.tenCV.toLowerCase()) return 1;  // nếu tên công việc đứng sau mà lớn hơn thì đổi chỗ --> mảng giảm dần
                return 0;
            });
        }
    }
    else if(sortKey=="ngayTao" && sortValue=="asc")
    {
        jobs.sort((a, b) => new Date(a.ngayTao) - new Date(b.ngayTao)); // a đứng trước b, nhưng nếu ngayTao của a > ngayTao của b thì đổi chỗ
    }
    else if(sortKey=="ngayTao" && sortValue=="desc")
    {
        jobs.sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao));  // a đứng trước b, nhưng nếu ngayTao cua b > ngayTao của a: thì đổi chỗ
    }

    return jobs;
}


// --------cv-------
module.exports.cv = () => {
    const sortObj = [
        {
            name: "Thời gian nộp giảm dần",
            value: "ngayNop-desc",
        },
        {
            name: "Thời gian nộp tăng dần",
            value: "ngayNop-asc",
        },
        {
            name: "Tên công việc giảm dần ",
            value: "tenCV-desc",
        },
        {
            name: "Tên công việc tăng dần ",
            value: "tenCV-asc",
        },
    ]

    return sortObj;
}

module.exports.cvSort = (sortKey, sortValue, jobsDetail) => {
    if (sortKey === "tenCV") 
    {
        if (sortValue === "asc") 
        {
            jobsDetail.sort((a, b) => {
                if (a.infoJob.tenCV.toLowerCase() < b.infoJob.tenCV.toLowerCase()) return -1;
                if (a.infoJob.tenCV.toLowerCase() > b.infoJob.tenCV.toLowerCase()) return 1;  // nếu tên công việc đứng trước mà lớn hơn thì đổi chỗ  ---> mảng tăng dần
                return 0;
            });
        } 
        else if (sortValue === "desc") 
        {
            jobsDetail.sort((a, b) => {
                if (a.infoJob.tenCV.toLowerCase() > b.infoJob.tenCV.toLowerCase()) return -1;
                if (a.infoJob.tenCV.toLowerCase() < b.infoJob.tenCV.toLowerCase()) return 1;  // nếu tên công việc đứng sau mà lớn hơn thì đổi chỗ --> mảng giảm dần
                return 0;
            });
        }
    }
    else if(sortKey=="ngayNop" && sortValue=="asc")
    {
        jobsDetail.sort((a, b) => new Date(a.thoiGianNop) - new Date(b.thoiGianNop)); // a đứng trước b, nhưng nếu ngayTao của a > ngayTao của b thì đổi chỗ
    }
    else if(sortKey=="ngayNop" && sortValue=="desc")
    {
        jobsDetail.sort((a, b) => new Date(b.thoiGianNop) - new Date(a.thoiGianNop));  // a đứng trước b, nhưng nếu ngayTao cua b > ngayTao của a: thì đổi chỗ
    }

    return jobsDetail;
}