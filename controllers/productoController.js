const Producto = require('../models/productoModel');

exports.getAllProductos = (req, res) => {
    Producto.getAll((err, productos) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener productos', error: err });
        } else {
            res.status(200).json(productos);
        }
    });
};

exports.getProductoById = (req, res) => {
    const productoId = req.params.id;
    Producto.getById(productoId, (err, producto) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener producto', error: err });
        } else if (!producto) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            res.status(200).json(producto);
        }
    });
};

exports.createProducto = (req, res) => {
    const newProducto = req.body;
    Producto.create(newProducto, (err, productoId) => {
        if (err) {
            res.status(500).json({ message: 'Error al crear producto', error: err });
        } else {
            res.status(201).json({ message: 'Producto creado', productoId });
        }
    });
};

exports.updateProducto = (req, res) => {
    const productoId = req.params.id;
    const updatedProducto = req.body;
    Producto.update(productoId, updatedProducto, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al actualizar producto', error: err });
        } else {
            res.status(200).json({ message: 'Producto actualizado', result });
        }
    });
};

exports.deleteProducto = (req, res) => {
    const productoId = req.params.id;
    Producto.delete(productoId, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al eliminar producto', error: err });
        } else {
            res.status(200).json({ message: 'Producto eliminado', result });
        }
    });
};
