const Venta = require('../models/ventaModel');

exports.getAllVentas = (req, res) => {
    Venta.getAll((err, ventas) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener ventas', error: err });
        } else {
            res.status(200).json(ventas);
        }
    });
};

exports.getVentaById = (req, res) => {
    const ventaId = req.params.id;
    Venta.getById(ventaId, (err, venta) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener venta', error: err });
        } else if (!venta) {
            res.status(404).json({ message: 'Venta no encontrada' });
        } else {
            res.status(200).json(venta);
        }
    });
};

exports.createVenta = (req, res) => {
    const newVenta = req.body;
    Venta.create(newVenta, (err, ventaId) => {
        if (err) {
            res.status(500).json({ message: 'Error al crear venta', error: err });
        } else {
            res.status(201).json({ message: 'Venta creada', ventaId });
        }
    });
};

exports.updateVenta = (req, res) => {
    const ventaId = req.params.id;
    const updatedVenta = req.body;
    Venta.update(ventaId, updatedVenta, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al actualizar venta', error: err });
        } else {
            res.status(200).json({ message: 'Venta actualizada', result });
        }
    });
};

exports.deleteVenta = (req, res) => {
    const ventaId = req.params.id;
    Venta.delete(ventaId, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al eliminar venta', error: err });
        } else {
            res.status(200).json({ message: 'Venta eliminada', result });
        }
    });
};
