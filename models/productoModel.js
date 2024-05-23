const { sql, poolConnect } = require('../config');

const Producto = {
    getAll: async (callback) => {
        try {
            const pool = await poolConnect;
            const request = new sql.Request(pool);
            request.query('SELECT [ID_producto], [Nombre_producto], [Descripción], [Precio], [Stock] FROM [dbo].[Productos]', (err, results) => {
                if (err) {
                    console.error('Error en la consulta SQL:', err);
                    return callback(err, null);
                }
                callback(null, results.recordset);
            });
        } catch (err) {
            console.error('Error en la conexión al ejecutar la consulta:', err);
            callback(err, null);
        }
    },
    getById: async (id, callback) => {
        try {
            const pool = await poolConnect;
            const request = new sql.Request(pool);
            request.input('ID_producto', sql.Int, id);
            request.query('SELECT [ID_producto], [Nombre_producto], [Descripción], [Precio], [Stock] FROM [dbo].[Productos] WHERE [ID_producto] = @ID_producto', (err, results) => {
                if (err) {
                    console.error('Error en la consulta SQL:', err);
                    return callback(err, null);
                }
                callback(null, results.recordset[0]);
            });
        } catch (err) {
            console.error('Error en la conexión al ejecutar la consulta:', err);
            callback(err, null);
        }
    },
    create: async (data, callback) => {
        try {
            const pool = await poolConnect;
            const request = new sql.Request(pool);
            request.input('Nombre_producto', sql.NVarChar, data.Nombre_producto);
            request.input('Descripción', sql.NVarChar, data.Descripción);
            request.input('Precio', sql.Decimal, data.Precio);
            request.input('Stock', sql.Int, data.Stock);
            request.query(
                'INSERT INTO [dbo].[Productos] ([Nombre_producto], [Descripción], [Precio], [Stock]) OUTPUT INSERTED.[ID_producto] VALUES (@Nombre_producto, @Descripción, @Precio, @Stock)',
                (err, result) => {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        return callback(err, null);
                    }
                    callback(null, result.recordset[0].ID_producto);
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
            request.input('ID_producto', sql.Int, id);
            request.input('Nombre_producto', sql.NVarChar, data.Nombre_producto);
            request.input('Descripción', sql.NVarChar, data.Descripción);
            request.input('Precio', sql.Decimal, data.Precio);
            request.input('Stock', sql.Int, data.Stock);
            request.query(
                'UPDATE [dbo].[Productos] SET [Nombre_producto] = @Nombre_producto, [Descripción] = @Descripción, [Precio] = @Precio, [Stock] = @Stock WHERE [ID_producto] = @ID_producto',
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
    },
    delete: async (id, callback) => {
        try {
            const pool = await poolConnect;
            const request = new sql.Request(pool);
            request.input('ID_producto', sql.Int, id);
            request.query('DELETE FROM [dbo].[Productos] WHERE [ID_producto] = @ID_producto', (err, result) => {
                if (err) {
                    console.error('Error en la consulta SQL:', err);
                    return callback(err, null);
                }
                callback(null, result);
            });
        } catch (err) {
            console.error('Error en la conexión al ejecutar la consulta:', err);
            callback(err, null);
        }
    }
};

module.exports = Producto;
