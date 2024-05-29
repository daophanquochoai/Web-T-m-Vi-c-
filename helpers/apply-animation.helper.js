const JobDetailModel = require("../models/Job-detail.model");

module.exports = async (jobs, res) => {
    for (const job of jobs) {
        let applied = 0;  // chưa nộp đơn + đã đăng nhập
        let dateAndStatus = "active"  // Hết hạn or Hết tuyển

        if(job.hetHan)
        {
            dateAndStatus = "inactive";
        }
        if(!job.trangThai)
        {
            dateAndStatus = "inactive";
        }

        var userId = ( res.locals.User ? res.locals.User.userId : "");
        if(!userId) // nếu chưa đăng nhập
        {
            applied = 100;
        }
        else
        {
            const jobDetail = await JobDetailModel.getDetailJobByMaCV_UserId(job.maCV, userId);
            if(jobDetail.length > 0)
            {
                applied = 2; // đã nộp đơn
            }
        }

        job.applied = applied;
        job.dateAndStatus = dateAndStatus 
    }
}