// compra.routes.js
const express = require('express');
const router = express.Router();
const compraController = require('../../backend/controller/compra.controller');

// Rutas CRUD para compras
router.get('/', compraController.getAllCompras);
router.get('/:id', compraController.getCompraById);
router.post('/', compraController.createCompra);
router.put('/:id', compraController.updateCompra);
router.delete('/:id', compraController.deleteCompra);

module.exports = router;
