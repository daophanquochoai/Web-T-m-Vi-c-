const {sql} = require("../config/database")


const getAnnounceOfUser = async (userId) => {
    try {
        const result = await sql.query`select * from THONGBAO where userId = ${userId}`;
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }

}
const getAnnounce = async (userId, maCV) => {
    try {
        const result = await sql.query`select * from THONGBAO where userId = ${userId} and maCV=${maCV}`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting getAnnounce:', err);
        return [];
    }
}

const checkAnnounce = async (userId, maCV) => {
    try {
        const result = await sql.query`select * from THONGBAO where userId = ${userId} and maCV = ${maCV}`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting checkAnnounce:', err);
        return [];
    }
}



const countAnnounceNotSeenOfUser = async (userId) => {
    try {
        const stringQuery = `select count(*) soluong from THONGBAO where daXem = 0 and userId = ${userId}`
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countAnnounceNotSeenOfUser:', err);
    }
}

const insertAnnounce = async (maCV, userId, thongBao, type) => {
    try {
        
        stringQuery = `insert into THONGBAO(maCV, userId, thongBao, thoiGianGui, ketQua)
        values(${maCV}, ${userId}, N'${thongBao}', CONVERT(datetime, getdate()), ${type}) 
        `;

        await sql.query(stringQuery);
        console.log("----- insert thông báo success!---")
    } catch (err) {
        console.log('insertAnnounce err:', err);
    }
}

const updateAnnounce = async (maCV, userId) => {
    try {
        
        stringQuery = `update THONGBAO
        set daXem = 1 where userId = ${userId} and maCV = ${maCV}
        `;

        await sql.query(stringQuery);
        console.log("----- updateAnnounce success!---")
    } catch (err) {
        console.log('updateAnnounce err:', err);
    }
}


module.exports = {
    insertAnnounce,
    getAnnounceOfUser,
    countAnnounceNotSeenOfUser,
    updateAnnounce,
    checkAnnounce,
    getAnnounce
};