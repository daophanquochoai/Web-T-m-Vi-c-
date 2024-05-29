const {sql} = require("../config/database")

const insertUser = async (body) => {
    try {
        const {ho, ten, sdt, gioiTinh, ngaySinh, email, matKhau, token} = body;
        await sql.query`insert into NGUOIDUNG(ho, ten, sdt, gioiTinh, ngaySinh, email, matKhau, token) values(${ho}, ${ten}, ${sdt}, ${gioiTinh}, ${ngaySinh}, ${email}, ${matKhau}, ${token})`;
    } catch (err) {
        console.error('Error getting users:', err);
    }
}

const updateUser = async (queryString) => {
    try {
        await sql.query(queryString);
        console.log("-----------------ok-----------------")
    } catch (err) {
        console.error('Error getting users:', err);
    }
}

const updateAvatarUser = async (userId, avatar) => {
    try {
        const queryString = `update NGUOIDUNG set avatar=N'${avatar}' where userId = ${userId}`
        await sql.query(queryString);
        console.log("-----------------ok-----------------")
    } catch (err) {
        console.error('Error updateAvatarUser:', err);
    }
}

const updateMatKhau = async (matKhau, token) => {
    try {
        const queryString = `update NGUOIDUNG set matKhau = '${matKhau}' where token = '${token}'`
        await sql.query(queryString);
        console.log("----------------- updateMatKhau ok-----------------")
    } catch (err) {
        console.error('Error updateMatKhau:', err);
    }
}

const getUserByToken = async (token) => {
    try {
        const result = await sql.query`select userId, ho, ten, sdt, gioiTinh, ngaySinh, email, avatar from NGUOIDUNG where token = ${token}`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting user by token:', err);
        return [];
    }
}

const getUserByEmail = async (email) => {
    try {
        const result = await sql.query`select * from NGUOIDUNG where email = ${email}`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting user by email:', err);
        return [];
    }
}

const getInfoUserByUserId = async (userId) => {
    try {
        const result = await sql.query`select userId, (ho+' '+ten) as hoTen, sdt, email from NGUOIDUNG where userId = ${userId}`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting getInfoUserByUserId:', err);
        return [];
    }
}


module.exports = {
    insertUser,
    getUserByToken,
    getUserByEmail,
    updateUser,
    updateAvatarUser,
    getInfoUserByUserId,
    updateMatKhau
};