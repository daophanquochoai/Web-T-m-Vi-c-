const {sql} = require("../config/database")

const getAllJobDetails = async () => {
    try {
        const result = await sql.query`select * from CHITIET_CV where deleted = 0`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting job detail:', err);
        return [];
    }
}

const getAllJobByMaCV = async (maCV) => {
    try {
        const result = await sql.query`select * from CONGVIEC, CHITIET_CV where CONGVIEC.maCV = CHITIET_CV.maCV and CONGVIEC.maCV = ${maCV}`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAllJobByMaCV:', err);
        return [];
    }
}

const getDetailJobByMaCV_UserId = async (maCV, userId) => {
    try {
        const result = await sql.query`select * from CHITIET_CV where CHITIET_CV.maCV = ${maCV} and CHITIET_CV.userId =${userId}`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting getDetailJobByMaCV_UserId:', err);
        return [];
    }
}

const getJobDetailByMaCTCV = async (maCTCV) => {
    try {
        const result = await sql.query`select * from CHITIET_CV where maCTCV=${maCTCV}`;
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting getJobDetailByMaCTCV:', err);
        return [];
    }
}

const insertJobDetail = async (jobDetail) => {
    try {
        const {maCV, userId, pdf, khuVucUT} = jobDetail;
        const stringQuery = `insert into CHITIET_CV(maCV, userId, thoiGianNop, pdf, khuVucUT) values(${maCV}, ${userId}, CONVERT(date, getdate()), N'${pdf}', ${khuVucUT})`;
        await sql.query(stringQuery);
        console.log("----------apply cv success~!");
    } catch (err) {
        console.error('Error insertJobDetail:', err);
    }
}

const updateDaXemCV = async (maCTCV) => {
    try {
        await sql.query`update CHITIET_CV set daXem = 1 where maCTCV = ${maCTCV}`;
    } catch (err) {
        console.log('updateDaXemCV err:', err);
    }
}

const updateDelete = async (maCTCV) => {
    try {
        await sql.query`update CHITIET_CV set deleted = 1 where maCTCV = ${maCTCV}`;
    } catch (err) {
        console.log('updateDelete err:', err);
    }
}

const countCVDaXem = async (congTyId) => {
    try {
        const stringQuery = `SELECT count(*) as soluong
        FROM     dbo.CONGVIEC INNER JOIN
                          dbo.CHITIET_CV ON (dbo.CONGVIEC.maCV = dbo.CHITIET_CV.maCV) and (dbo.CONGVIEC.congTyId = ${congTyId}) and (dbo.CHITIET_CV.daXem = 1) and (dbo.CHITIET_CV.deleted = 0)
        `;
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countCVDaXem:', err);
    }
}

const countCVChuaXem = async (congTyId) => {
    try {
        const stringQuery = `SELECT count(*) as soluong
        FROM     dbo.CONGVIEC INNER JOIN
                          dbo.CHITIET_CV ON (dbo.CONGVIEC.maCV = dbo.CHITIET_CV.maCV) and (dbo.CONGVIEC.congTyId = ${congTyId}) and (dbo.CHITIET_CV.daXem = 0) and (dbo.CHITIET_CV.deleted = 0)
        `;
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countCVChuaXem:', err);
    }
}

const countCV = async (congTyId) => {
    try {
        const stringQuery = `SELECT count(*) as soluong
        FROM     dbo.CONGVIEC INNER JOIN
                          dbo.CHITIET_CV ON (dbo.CONGVIEC.maCV = dbo.CHITIET_CV.maCV) and (dbo.CONGVIEC.congTyId = ${congTyId}) and (dbo.CHITIET_CV.deleted = 0)
        `;
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countCV:', err);
    }
}


module.exports = {
    getAllJobDetails,
    insertJobDetail,
    getJobDetailByMaCTCV,
    updateDaXemCV,
    countCVDaXem,
    countCVChuaXem,
    countCV,
    getAllJobByMaCV,
    getDetailJobByMaCV_UserId,
    updateDelete
};