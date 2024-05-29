const {sql} = require("../config/database")

const getAllJobs = async () => {
    try {
        const result = await sql.query`select * from CONGVIEC where deleted=0`;
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}

const getAllJobsPagi = async (limitPerPage, skip) => {
    try {
        const stringQuery = `SELECT * 
        FROM CONGVIEC 
        WHERE deleted=0
        ORDER BY ngayTao DESC
        OFFSET ${skip} ROWS 
        FETCH NEXT ${limitPerPage} ROWS ONLY`
        const result = await sql.query(stringQuery);
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}

const getJobsByForm = async (query) => {
    try {
        const queryString = query.toString();
        const result = await sql.query(queryString);
        console.log("okko")
        return result.recordset;
    } catch (error) {
        console.log("Error getting jobs by form search", error);
        return [];
    }
}

const getJobBySlug = async (slug) => {
    try {
        const result = await sql.query`select * from CONGVIEC where slug = ${slug} and deleted=0`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}

const getJobNameByMaCV = async (maCV) => {
    try {
        const result = await sql.query`select maCV, tenCV, chiTietCV, slug from CONGVIEC where maCV = ${maCV} and deleted=0`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting getJobNameByMaCV:', err);
        return [];
    }
}



const getJobOfCompany = async (id) => {
    try {
        const result = await sql.query`select * from CONGVIEC where CONGVIEC.congTyId = ${id} and deleted=0`;
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}

const updateJobDateApply = async (maCV, value) => {
    try {
        // console.log(maCV);
        const stringQuery = `update CONGVIEC set hetHan = ${value} where maCV = ${maCV}`;
        // console.log(stringQuery);
        await sql.query(stringQuery);
    } catch (err) {
        console.log('Update job: date for apply err:', err);
    }
}

const updateJobStatus = async (maCV, value) => {
    try {
        // console.log(maCV);
        const stringQuery = `update CONGVIEC set trangThai = ${value} where maCV = ${maCV}`;
        // console.log(stringQuery);
        await sql.query(stringQuery);
        // console.log("----------update Trạng thái công việc thành công------------");
    } catch (err) {
        console.log('Update job: updateJobStatus', err);
    }
}

const deleteJob = async (slug) => {
    try {
        await sql.query`update CONGVIEC set deleted = 1 where slug = ${slug}`;
        console.log("----------deleteJob công việc thành công------------");
    } catch (err) {
        console.log('Update job: deleteJob', err);
    }
}

const countJobDangTuyen = async (congTyId) => {
    try {
        const stringQuery = `select count(*) soluong from CONGVIEC where (congTyId = ${congTyId}) and (trangThai = 1) and (deleted = 0)`
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countJobDangTuyen:', err);
    }
}

const countJobDungTuyen = async (congTyId) => {
    try {
        const stringQuery = `select count(*) soluong from CONGVIEC where (congTyId = ${congTyId}) and (trangThai = 0) and (deleted = 0)`
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countJobDungTuyen:', err);
    }
}

const countJob = async (congTyId) => {
    try {
        const stringQuery = `select count(*) soluong from CONGVIEC where (congTyId = ${congTyId}) and (deleted = 0)`
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countJob:', err);
    }
}

const countAllJob = async (congTyId) => {
    try {
        const stringQuery = `select count(*) soluong from CONGVIEC where (deleted = 0)`
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countJob:', err);
    }
}





const insertJob = async (congTyId, body) => {
    try {
        let {tenCV, moTa, luong, chiTietCV, kinhNghiem, hanChot, slug} = body;
        
        luong = parseInt(luong);

        stringQuery = `insert into CONGVIEC(congTyId, tenCV, moTa, chiTietCV, luong, kinhNghiem, ngayTao, hanChot, slug) values(${congTyId}, N'${tenCV}', N'${moTa}', N'${chiTietCV}', ${luong}, '${kinhNghiem}', CONVERT(date, getdate()), '${hanChot}', '${slug}')`;

        console.log(stringQuery);

        await sql.query(stringQuery);
        console.log("----- insert job success!---")
    } catch (err) {
        console.log('insertJob err:', err);
    }
}

const updateJob = async (maCV, body) => {
    try {
        let {tenCV, moTa, luong, chiTietCV, kinhNghiem, hanChot} = body;
        
        luong = parseInt(luong);

        stringQuery = `update CONGVIEC set tenCV=N'${tenCV}', moTa=N'${moTa}', luong = ${luong}, chiTietCV=N'${chiTietCV}', kinhNghiem=${kinhNghiem}, hanChot='${hanChot}' where maCV=${maCV}`;

        console.log(stringQuery);

        await sql.query(stringQuery);
        console.log("----- update job success!---")
    } catch (err) {
        console.log('updateJob err:', err);
    }
}





module.exports = {
    getAllJobs,
    getJobsByForm,
    getJobBySlug,
    getJobOfCompany,
    updateJobDateApply,
    insertJob,
    getJobNameByMaCV,
    countJobDangTuyen,
    countJobDungTuyen,
    countJob,
    getAllJobsPagi,
    countAllJob,
    updateJob,
    updateJobStatus,
    deleteJob
};