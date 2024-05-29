const sql = require('mssql');

const config = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    database: 'JOB',
    options: {
        enableArithAbort: true,
        trustServerCertificate: true // Bỏ qua kiểm tra chứng chỉ TLS
    }
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('Connected to SQL Server');
    } catch (err) {
        console.error('Error connecting to SQL Server:', err);
    }
}

module.exports = {
    sql,
    connectDB
};