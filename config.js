// config.js
const sql = require('mssql');

const config = {
    server: 'DESKTOP-FL2LA93',
    options: {
        database: 'onlineMayo',//aca va el nombre e la Base de datos..//
        encrypt: false,
        trustServerCertificate: true,
        port: 1433
    },
    authentication: {//obligatoria que la base de datos tenga autenticacion usuario/password
        type: 'default',
        options: {
            userName: 'erick',
            password: '12345'
        }
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect()
    .then(pool => {
        console.log('Conexión exitosa a SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Error de conexión a SQL Server:', err);
        throw err;
    });

pool.on('error', err => {
    console.error('Error del pool de conexión:', err);
});

module.exports = {
    sql, poolConnect
};
