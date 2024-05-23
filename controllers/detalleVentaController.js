const DetalleVenta = require('../models/detalleVentaModel');

exports.getAllDetalleVentas = (req, res) => {
    DetalleVenta.getAll((err, detalles) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener detalles de ventas', error: err });
        } else {
            res.status(200).json(detalles);
        }
    });
};

exports.getDetalleVentaById = (req, res) => {
    const detalleId = req.params.id;
    DetalleVenta.getById(detalleId, (err, detalle) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener detalle de venta', error: err });
        } else if (!detalle) {
            res.status(404).json({ message: 'Detalle no encontrado' });
        } else {
            res.status(200).json(detalle);
        }
    });
};

exports.createDetalleVenta = (req, res) => {
    const newDetalle = req.body;
    DetalleVenta.create(newDetalle, (err, detalleId) => {
        if (err) {
            res.status(500).json({ message: 'Error al crear detalle de venta', error: err });
        } else {
            res.status(201).json({ message: 'Detalle de venta creado', detalleId });
        }
    });
};

exports.updateDetalleVenta = (req, res) => {
    const detalleId = req.params.id;
    const updatedDetalle = req.body;
    DetalleVenta.update(detalleId, updatedDetalle, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al actualizar detalle de venta', error: err });
        } else {
            res.status(200).json({ message: 'Detalle de venta actualizado', result });
        }
    });
};

exports.deleteDetalleVenta = (req, res) => {
    const detalleId = req.params.id;
    DetalleVenta.delete(detalleId, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al eliminar detalle de venta', error: err });
        } else {
            res.status(200).json({ message: 'Detalle de venta eliminado', result });
        }
    });
};
