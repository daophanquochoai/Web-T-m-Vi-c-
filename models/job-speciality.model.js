const {sql} = require("../config/database")

const getAllJobSpeciality = async () => {
    try {
        const result = await sql.query`select * from CONGVIEC_LINHVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting job - speciality:', err);
        return [];
    }
}

const getNameSpecialityOfCV = async (maCV) => {
    try {
        const result = await sql.query`select tenLV from CONGVIEC_LINHVUC, CONGVIEC, LINHVUC where CONGVIEC.maCV = CONGVIEC_LINHVUC.maCV and CONGVIEC.maCV = ${maCV} and LINHVUC.maLV = CONGVIEC_LINHVUC.maLV`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting getNameSpecialityOfCV:', err);
        return [];
    }
}

const insertJobSpeciality = async (maCV, maLV) => {
    try {
        const stringQuery = `insert into CONGVIEC_LINHVUC(maLV, maCV) values (${maLV}, ${maCV})`;
        console.log(stringQuery);
        await sql.query(stringQuery);
        console.log("add tag success!")
    } catch (err) {
        console.error('Error getting insertJobSpeciality:', err);
    }
}

const deleteSpecialityArea = async (maCV) => {
    try {
        const stringQuery = `delete from CONGVIEC_LINHVUC where maCV = ${maCV}`;
        await sql.query(stringQuery);
        console.log("delete tags success!")
    } catch (err) {
        console.error('Error getting deleteSpecialityArea:', err);
    }
}

module.exports = {
    getAllJobSpeciality,
    insertJobSpeciality,
    getNameSpecialityOfCV,
    deleteSpecialityArea
};