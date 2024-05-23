const DetalleCarrito = require('../models/detalleCarritoModel');

exports.getAllDetalleCarrito = (req, res) => {
    DetalleCarrito.getAll((err, detalles) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener detalles del carrito', error: err });
        } else {
            res.status(200).json(detalles);
        }
    });
};

exports.getDetalleCarritoById = (req, res) => {
    const detalleId = req.params.id;
    DetalleCarrito.getById(detalleId, (err, detalle) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener detalle del carrito', error: err });
        } else if (!detalle) {
            res.status(404).json({ message: 'Detalle no encontrado' });
        } else {
            res.status(200).json(detalle);
        }
    });
};

exports.createDetalleCarrito = (req, res) => {
    const newDetalle = req.body;
    DetalleCarrito.create(newDetalle, (err, detalleId) => {
        if (err) {
            res.status(500).json({ message: 'Error al crear detalle del carrito', error: err });
        } else {
            res.status(201).json({ message: 'Detalle del carrito creado', detalleId });
        }
    });
};

exports.updateDetalleCarrito = (req, res) => {
    const detalleId = req.params.id;
    const updatedDetalle = req.body;
    DetalleCarrito.update(detalleId, updatedDetalle, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al actualizar detalle del carrito', error: err });
        } else {
            res.status(200).json({ message: 'Detalle del carrito actualizado', result });
        }
    });
};

exports.deleteDetalleCarrito = (req, res) => {
    const detalleId = req.params.id;
    DetalleCarrito.delete(detalleId, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al eliminar detalle del carrito', error: err });
        } else {
            res.status(200).json({ message: 'Detalle del carrito eliminado', result });
        }
    });
};
