const sql = require('mssql');

const config = {
    server: 'DESKTOP-FL2LA93',
    options: {
        database: 'onlineMayo',
        encrypt: false,
        trustServerCertificate: true,
        port: 1433
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'allbert',
            password: '12345'
        }
    }
};

async function testQuery() {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Clientes');
        console.log('Consulta exitosa:', result.recordset);
        pool.close();
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
    }
}

testQuery();
