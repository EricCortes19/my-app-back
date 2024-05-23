const { sql, poolConnect } = require('../config');

const DetalleVenta = {
    getAll: async (callback) => {
        try {
            const pool = await poolConnect;
            const request = new sql.Request(pool);
            request.query('SELECT [ID_detalle], [ID_venta], [ID_producto], [Cantidad], [Subtotal] FROM [dbo].[Detalle_ventas]', (err, results) => {
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
            request.input('ID_detalle', sql.Int, id);
            request.query('SELECT [ID_detalle], [ID_venta], [ID_producto], [Cantidad], [Subtotal] FROM [dbo].[Detalle_ventas] WHERE [ID_detalle] = @ID_detalle', (err, results) => {
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
            request.input('ID_venta', sql.Int, data.ID_venta);
            request.input('ID_producto', sql.Int, data.ID_producto);
            request.input('Cantidad', sql.Int, data.Cantidad);
            request.input('Subtotal', sql.Decimal, data.Subtotal);
            request.query(
                'INSERT INTO [dbo].[Detalle_ventas] ([ID_venta], [ID_producto], [Cantidad], [Subtotal]) OUTPUT INSERTED.[ID_detalle] VALUES (@ID_venta, @ID_producto, @Cantidad, @Subtotal)',
                (err, result) => {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        return callback(err, null);
                    }
                    callback(null, result.recordset[0].ID_detalle);
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
            request.input('ID_detalle', sql.Int, id);
            request.input('ID_venta', sql.Int, data.ID_venta);
            request.input('ID_producto', sql.Int, data.ID_producto);
            request.input('Cantidad', sql.Int, data.Cantidad);
            request.input('Subtotal', sql.Decimal, data.Subtotal);
            request.query(
                'UPDATE [dbo].[Detalle_ventas] SET [ID_venta] = @ID_venta, [ID_producto] = @ID_producto, [Cantidad] = @Cantidad, [Subtotal] = @Subtotal WHERE [ID_detalle] = @ID_detalle',
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
            request.input('ID_detalle', sql.Int, id);
            request.query('DELETE FROM [dbo].[Detalle_ventas] WHERE [ID_detalle] = @ID_detalle', (err, result) => {
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

module.exports = DetalleVenta;
