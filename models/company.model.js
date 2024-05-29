const {sql} = require("../config/database")

const getAllCompanies = async () => {
    try {
        const result = await sql.query`select * from CONGTY`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting Companies:', err);
        return [];
    }
}

const getCompanyById = async (companyId) => {
    try {
        const result = await sql.query`select * from CONGTY where congTyId = ${companyId}`;
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting detail Companies by id:', err);
        return [];
    }
}

const getCompanyBySlug = async (slugCom) => {
    try {
        const result = await sql.query`select * from CONGTY where slug = ${slugCom}`;
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting detail Companies by slug:', err);
        return [];
    }
}

const getCompanyByEmail = async (emailCT) => {
    try {
        const result = await sql.query`select * from CONGTY where emailCT = ${emailCT}`;
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting detail Companies by email:', err);
        return [];
    }
}

const getInfoUserOfCompany = async (congTyId) => {
    try {
        const sqlQuery = `select (ho + ' ' + ten) as hoTen, sdt, email from CONGTY join NGUOIDUNG on CONGTY.userId = NGUOIDUNG.userId and CONGTY.congTyId = ${congTyId}`;
        const result = await sql.query(sqlQuery);
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting info company:', err);
        return [];
    }
}

const getCompanyByMaCV = async (maCV) => {
    try {
        const sqlQuery = `select tenCT, tenCV, logo from CONGVIEC, CONGTY where CONGVIEC.congTyId = CONGTY.congTyId and CONGVIEC.maCV = ${maCV}`;
        const result = await sql.query(sqlQuery);
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting getCompanyByMaCV:', err);
        return [];
    }
}

const getInfoCompanyByIdUser = async (userId) => {
    try {
        const sqlQuery = `SELECT dbo.NGUOIDUNG.userId, dbo.NGUOIDUNG.sdt, dbo.NGUOIDUNG.email, dbo.CONGTY.congTyId, dbo.CONGTY.tenCT, dbo.CONGTY.diaDiem, dbo.CONGTY.quyMo, dbo.CONGTY.moTa, dbo.CONGTY.logo, dbo.CONGTY.slug, dbo.CONGTY.sdtCT, dbo.CONGTY.emailCT
        FROM dbo.CONGTY INNER JOIN dbo.NGUOIDUNG ON dbo.CONGTY.userId = dbo.NGUOIDUNG.userId and dbo.NGUOIDUNG.userId = ${userId}`;
        const result = await sql.query(sqlQuery);
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting info company:', err);
        return [];
    }
}

const getAllCompaniesBySearch = async (stringQuery) => {
    try {
        const result = await sql.query(stringQuery);
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAllCompaniesBySearch:', err);
        return [];
    }
}
const updateInfoCompany = async (infoCompany, congTyId) => {
    try {
        let stringQuery = `update CONGTY set tenCT = N'${infoCompany.tenCT}', diaDiem = N'${infoCompany.diaDiem}', sdtCT = '${infoCompany.sdtCT}', emailCT = '${infoCompany.emailCT}', quyMo = ${infoCompany.quyMo}, moTa = N'${infoCompany.moTa}', slug = '${infoCompany.slug}' where congTyId = ${congTyId}`
        if(infoCompany.logo)
        {
            stringQuery = `update CONGTY set tenCT = N'${infoCompany.tenCT}', diaDiem = N'${infoCompany.diaDiem}', sdtCT = '${infoCompany.sdtCT}', emailCT = '${infoCompany.emailCT}', quyMo = ${infoCompany.quyMo}, moTa = N'${infoCompany.moTa}', logo = N'${infoCompany.logo}', slug = '${infoCompany.slug}' where congTyId = ${congTyId}`;
        }
        await sql.query(stringQuery);
        console.log("----------update info company success!")
        return;
    } catch (err) {
        console.error('Error getting updateInfoCompany:', err);
    }
}

const updateInfoCompanyClient = async (infoCompany, congTyId) => {
    try {
        let stringQuery = `update CONGTY set tenCT = N'${infoCompany.tenCT}', diaDiem = N'${infoCompany.diaDiem}', sdtCT = '${infoCompany.sdtCT}', emailCT = '${infoCompany.emailCT}', quyMo = ${infoCompany.quyMo}, slug = '${infoCompany.slug}' where congTyId = ${congTyId}`
        if(infoCompany.logo)
        {
            stringQuery = `update CONGTY set tenCT = N'${infoCompany.tenCT}', diaDiem = N'${infoCompany.diaDiem}', sdtCT = '${infoCompany.sdtCT}', emailCT = '${infoCompany.emailCT}', quyMo = ${infoCompany.quyMo}, slug = '${infoCompany.slug}', logo = N'${infoCompany.logo}' where congTyId = ${congTyId}`;
        }
        await sql.query(stringQuery);
        console.log("----------update info company success!")
        return;
    } catch (err) {
        console.error('Error getting updateInfoCompany:', err);
    }
}

const insertCompany = async (userId, infoCompany) => {
    try {
        const {tenCT, quyMo, diaDiem, sdtCT, emailCT, logo} = infoCompany;
        const stringQuery = `
            insert into CONGTY(userId, tenCT, diaDiem, quyMo, logo, sdtCT, emailCT)
            values(${userId}, N'${tenCT}', N'${diaDiem}', ${quyMo}, N'${logo}', '${sdtCT}', '${emailCT}')
        `
        await sql.query(stringQuery);
        console.log("----------create info company success!")
        return;
    } catch (err) {
        console.error('Error getting insertCompany:', err);
    }
}



module.exports = {
    getAllCompanies,
    getCompanyById,
    getCompanyBySlug,
    getCompanyByEmail,
    getCompanyByMaCV,
    getInfoUserOfCompany,
    getAllCompaniesBySearch,
    getInfoCompanyByIdUser,
    updateInfoCompany,
    updateInfoCompanyClient,
    insertCompany
};