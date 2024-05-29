const {sql} = require("../config/database")

const getAllSpecialties = async () => {
    try {
        const result = await sql.query`select * from LINHVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAllSpecialties:', err);
        return [];
    }
}

const getAllSpecialtiesWithMaTen = async () => {
    try {
        const result = await sql.query`select maLV, tenLV from LINHVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAllSpecialtiesWithMaTen:', err);
        return [];
    }
}

const getAllSpecialtiesWithTen = async () => {
    try {
        const result = await sql.query`select tenLV from LINHVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAllSpecialtiesWithTen:', err);
        return [];
    }
}

const insertSpecialtyByName = async (tag) => {
    try {
        const stringQuery = `insert into LINHVUC(tenLV) values('${tag}')`;
        console.log(stringQuery);
        await sql.query(stringQuery);
        console.log("add tag success!")
    } catch (err) {
        console.error('Error getting insertSpecialtyByName:', err);
    }
}



module.exports = {
    getAllSpecialties,
    getAllSpecialtiesWithMaTen,
    getAllSpecialtiesWithTen,
    insertSpecialtyByName
};