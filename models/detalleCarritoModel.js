const { sql, poolConnect } = require('../config');

const DetalleCarrito = {
    getAll: async (callback) => {
        try {
            const pool = await poolConnect;
            const request = new sql.Request(pool);
            request.query('SELECT [ID_detalle_carrito], [ID_carrito], [ID_producto], [Cantidad] FROM [dbo].[Detalle_carrito]', (err, results) => {
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
            request.input('ID_detalle_carrito', sql.Int, id);
            request.query('SELECT [ID_detalle_carrito], [ID_carrito], [ID_producto], [Cantidad] FROM [dbo].[Detalle_carrito] WHERE [ID_detalle_carrito] = @ID_detalle_carrito', (err, results) => {
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
            request.input('ID_carrito', sql.Int, data.ID_carrito);
            request.input('ID_producto', sql.Int, data.ID_producto);
            request.input('Cantidad', sql.Int, data.Cantidad);
            request.query(
                'INSERT INTO [dbo].[Detalle_carrito] ([ID_carrito], [ID_producto], [Cantidad]) OUTPUT INSERTED.[ID_detalle_carrito] VALUES (@ID_carrito, @ID_producto, @Cantidad)',
                (err, result) => {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        return callback(err, null);
                    }
                    callback(null, result.recordset[0].ID_detalle_carrito);
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
            request.input('ID_detalle_carrito', sql.Int, id);
            request.input('ID_carrito', sql.Int, data.ID_carrito);
            request.input('ID_producto', sql.Int, data.ID_producto);
            request.input('Cantidad', sql.Int, data.Cantidad);
            request.query(
                'UPDATE [dbo].[Detalle_carrito] SET [ID_carrito] = @ID_carrito, [ID_producto] = @ID_producto, [Cantidad] = @Cantidad WHERE [ID_detalle_carrito] = @ID_detalle_carrito',
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
            request.input('ID_detalle_carrito', sql.Int, id);
            request.query('DELETE FROM [dbo].[Detalle_carrito] WHERE [ID_detalle_carrito] = @ID_detalle_carrito', (err, result) => {
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

module.exports = DetalleCarrito;
