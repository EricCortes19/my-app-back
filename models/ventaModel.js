const { sql, poolConnect } = require('../config');

const Venta = {
    getAll: async (callback) => {
        try {
            const pool = await poolConnect;
            const request = new sql.Request(pool);
            request.query('SELECT [ID_venta], [ID_cliente], [Fecha_venta], [Total_venta] FROM [dbo].[Ventas]', (err, results) => {
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
            request.input('ID_venta', sql.Int, id);
            request.query('SELECT [ID_venta], [ID_cliente], [Fecha_venta], [Total_venta] FROM [dbo].[Ventas] WHERE [ID_venta] = @ID_venta', (err, results) => {
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
            request.input('ID_cliente', sql.Int, data.ID_cliente);
            request.input('Fecha_venta', sql.DateTime, data.Fecha_venta);
            request.input('Total_venta', sql.Decimal, data.Total_venta);
            request.query(
                'INSERT INTO [dbo].[Ventas] ([ID_cliente], [Fecha_venta], [Total_venta]) OUTPUT INSERTED.[ID_venta] VALUES (@ID_cliente, @Fecha_venta, @Total_venta)',
                (err, result) => {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        return callback(err, null);
                    }
                    callback(null, result.recordset[0].ID_venta);
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
            request.input('ID_venta', sql.Int, id);
            request.input('ID_cliente', sql.Int, data.ID_cliente);
            request.input('Fecha_venta', sql.DateTime, data.Fecha_venta);
            request.input('Total_venta', sql.Decimal, data.Total_venta);
            request.query(
                'UPDATE [dbo].[Ventas] SET [ID_cliente] = @ID_cliente, [Fecha_venta] = @Fecha_venta, [Total_venta] = @Total_venta WHERE [ID_venta] = @ID_venta',
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
            request.input('ID_venta', sql.Int, id);
            request.query('DELETE FROM [dbo].[Ventas] WHERE [ID_venta] = @ID_venta', (err, result) => {
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

module.exports = Venta;
