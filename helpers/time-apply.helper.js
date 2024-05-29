const CompanyModel = require("../models/Company.model");
const JobModel = require("../models/Job.model");


module.exports.time = async (jobs) => {
    

    for (const job of jobs) {
        const company = await CompanyModel.getCompanyById(job.congTyId);
        // console.log(company);
        job.company = company

        const ngayTao = new Date(job.ngayTao);
        const ngayHetHan = new Date(job.hanChot);
        const ngayHienTai = new Date();
        
        const soNgayTuNgayKhoiTao = Math.floor((ngayHienTai - ngayTao) / (1000 * 60 * 60 * 24));
        const soNgayHieuLuc = Math.floor((ngayHetHan - ngayTao) / (1000 * 60 * 60 * 24));

        job.soNgayTuNgayKhoiTao = soNgayTuNgayKhoiTao;
        job.soNgayHieuLuc = soNgayHieuLuc;

        if(job.soNgayTuNgayKhoiTao - job.soNgayHieuLuc > 0) // Hết hạn
        {
            JobModel.updateJobDateApply(job.maCV, 1); 
            JobModel.updateJobStatus(job.maCV, 0); // Nếu hết hạn thì cho trạng thái dừng tuyển luôn
        }
        else  
        {
            JobModel.updateJobDateApply(job.maCV, 0);
        }
    }

    return jobs;
}

