const express = require('express');
const router = express.Router();
const detalleCarritoController = require('../controllers/detalleCarritoController');

router.get('/', detalleCarritoController.getAllDetalleCarrito);
router.get('/:id', detalleCarritoController.getDetalleCarritoById);
router.post('/', detalleCarritoController.createDetalleCarrito);
router.put('/:id', detalleCarritoController.updateDetalleCarrito);
router.delete('/:id', detalleCarritoController.deleteDetalleCarrito);

module.exports = router;
