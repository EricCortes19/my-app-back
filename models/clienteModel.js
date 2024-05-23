// models/clienteModel.js
const { sql, poolConnect } = require('../config');

const Cliente = {
    getAll: async (callback) => {
        try {
            const pool = await poolConnect;
            console.log('Estado del pool:', pool.connected ? 'Conectado' : 'Desconectado');  // Verificar el estado del pool
            if (pool.connected) {
                const request = new sql.Request(pool);  // Crear una nueva solicitud en el contexto del pool
                request.query('SELECT * FROM Clientes', (err, results) => {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        return callback(err, null);
                    }
                    callback(null, results.recordset);
                });
            } else {
                console.error('El pool no está conectado');
                callback({ message: 'El pool no está conectado' }, null);
            }
        } catch (err) {
            console.error('Error en la conexión al ejecutar la consulta:', err);
            callback(err, null);
        }
    },

    create: async (data, callback) => {
        try {
            const pool = await poolConnect;
            const request = new sql.Request(pool);
            request.input('Nombre', sql.NVarChar, data.Nombre);
            request.input('Email', sql.NVarChar, data.Email);
            request.input('Contraseña', sql.NVarChar, data.Contraseña);
            request.input('Dirección', sql.NVarChar, data.Dirección);
            request.query(
                'INSERT INTO Clientes (Nombre, Email, Contraseña, Dirección) OUTPUT INSERTED.ID_cliente VALUES (@Nombre, @Email, @Contraseña, @Dirección)',
                (err, result) => {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        return callback(err, null);
                    }
                    callback(null, result.recordset[0].ID_cliente);
                }
            );
        } catch (err) {
            console.error('Error en la conexión al ejecutar la consulta:', err);
            callback(err, null);
        }
    },

    update: async (id, data, callback) => {
        try {
            const pool = await poolConnect;
            const request = new sql.Request(pool);
            request.input('ID_cliente', sql.Int, id);
            request.input('Nombre', sql.NVarChar, data.Nombre);
            request.input('Email', sql.NVarChar, data.Email);
            request.input('Contraseña', sql.NVarChar, data.Contraseña);
            request.input('Dirección', sql.NVarChar, data.Dirección);
            request.query(
                'UPDATE Clientes SET Nombre = @Nombre, Email = @Email, Contraseña = @Contraseña, Dirección = @Dirección WHERE ID_cliente = @ID_cliente',
                (err, result) => {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        return callback(err, null);
                    }
                    callback(null, result);
                }
            );
        } catch (err) {
            console.error('Error en la conexión al ejecutar la consulta:', err);
            callback(err, null);
        }
    }
};

module.exports = Cliente;
