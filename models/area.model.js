const {sql} = require("../config/database")

const getAllAreas = async () => {
    try {
        const result = await sql.query`select * from KHUVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAllAreas:', err);
        return [];
    }
}

const getAllAreasWithMaTen = async () => {
    try {
        const result = await sql.query`select maKV, tenKV from KHUVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAllAreasWithMaTen:', err);
        return [];
    }
}

const getAreasWithMaKV = async (maKV) => {
    try {
        const result = await sql.query`select maKV, tenKV from KHUVUC where maKV=${maKV}`;
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting getAreasWithMaKV:', err);
        return [];
    }
}



module.exports = {
    getAllAreas,
    getAllAreasWithMaTen,
    getAreasWithMaKV
};