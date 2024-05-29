const {sql} = require("../config/database")

const getAreaOfJob = async (slugCV) => {
    try {
        const sqlQuery = `select maKV, tenKV from KHUVUC where KHUVUC.maKV in (select maKV from CONGVIEC join CONGVIEC_KHUVUC on CONGVIEC.maCV = CONGVIEC_KHUVUC.maCV and CONGVIEC.slug = '${slugCV}')`;
        const result = await sql.query(sqlQuery);
        return result.recordset;
    } catch (err) {
        console.error('Error getting job - area:', err);
        return [];
    }
}

const getAreaOfJobByMaCV = async (maCV) => {
    try {
        const sqlQuery = `select KHUVUC.tenKV from KHUVUC, CONGVIEC_KHUVUC where CONGVIEC_KHUVUC.maCV = ${maCV} and KHUVUC.maKV = CONGVIEC_KHUVUC.maKV`;
        const result = await sql.query(sqlQuery);
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAreaOfJobByCompanyId:', err);
        return [];
    }
}

const insertJobArea = async (maCV, maKV) => {
    try {
        const stringQuery = `insert into CONGVIEC_KHUVUC(maKV, maCV) values (${maKV}, ${maCV})`;
        console.log(stringQuery);
        await sql.query(stringQuery);
        console.log("add area success!")
    } catch (err) {
        console.error('Error getting insertJobArea:', err);
    }
}

const deleteJobArea = async (maCV) => {
    try {
        const stringQuery = `delete from CONGVIEC_KHUVUC where maCV = ${maCV}`;
        await sql.query(stringQuery);
        console.log("delete areas success!")
    } catch (err) {
        console.error('Error getting deleteJobArea:', err);
    }
}



module.exports = {
    getAreaOfJob,
    getAreaOfJobByMaCV,
    insertJobArea,
    deleteJobArea
};