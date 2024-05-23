const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const detalleCarritoRoutes = require('./routes/detalleCarritoRoutes');
const detalleVentaRoutes = require('./routes/detalleVentaRoutes');

app.use('/clientes', clienteRoutes);
app.use('/productos', productoRoutes);
app.use('/ventas', ventaRoutes);
app.use('/detalle_carrito', detalleCarritoRoutes);
app.use('/detalle_ventas', detalleVentaRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
