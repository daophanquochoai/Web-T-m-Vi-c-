const {sql} = require("../config/database")

const insertForgotPass = async (email, otp) => {
    try {
        const stringQuery = `
            INSERT INTO ForgotPassword (email, otp, created_at)
            VALUES ('${email}', '${otp}', GETDATE())
        `
        await sql.query(stringQuery);
        console.log("----------insertForgotPass success!")
        return;
    } catch (err) {
        console.error('Error getting insertForgotPass:', err);
    }
}

const deleteOTPexpires = async () => {
    try {
        const stringQuery = `
            DELETE FROM ForgotPassword WHERE created_at < DATEADD(MINUTE, -3, GETDATE())
        `
        await sql.query(stringQuery);
        console.log("----------deleteOTPexpires success!")
        return;
    } catch (err) {
        console.error('Error getting deleteOTPexpires:', err);
    }
}

const getOTP = async (email, otp) => {
    try {
        const result = await sql.query`select * from ForgotPassword where email=${email} and otp=${otp}`;
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting getOTP:', err);
        return [];
    }
}



module.exports = {
    insertForgotPass,
    deleteOTPexpires,
    getOTP
};