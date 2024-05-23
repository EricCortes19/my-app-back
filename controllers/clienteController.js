// controllers/clienteController.js
const Cliente = require('../models/clienteModel');

exports.getAllClientes = (req, res) => {
    Cliente.getAll((err, clientes) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener clientes', error: err });
        } else {
            res.status(200).json(clientes);
        }
    });
};

exports.createCliente = (req, res) => {
    const newCliente = req.body;
    Cliente.create(newCliente, (err, clienteId) => {
        if (err) {
            res.status(500).json({ message: 'Error al crear cliente', error: err });
        } else {
            res.status(201).json({ message: 'Cliente creado', clienteId });
        }
    });
};

exports.updateCliente = (req, res) => {
    const clienteId = req.params.id;
    const updatedCliente = req.body;
    Cliente.update(clienteId, updatedCliente, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al actualizar cliente', error: err });
        } else {
            res.status(200).json({ message: 'Cliente actualizado', result });
        }
    });
};