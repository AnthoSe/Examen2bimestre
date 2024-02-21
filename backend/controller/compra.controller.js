// compra.controller.js
const Compra = require('../models/compra.model');
exports.getAllCompras = async (req, res) => {
  try {
    const compras = await Compra.find();
    res.json(compras);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener compras' });
  }
};

// Obtener una compra por ID
exports.getCompraById = async (req, res) => {
  const compraId = req.params.id;

  try {
    const compra = await Compra.findById(compraId);
    if (!compra) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }
    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener compra por ID' });
  }
};

// Crear una nueva compra
exports.createCompra = async (req, res) => {
  const { userId, nombre, itemComprado } = req.body;

  try {
    const newCompra = await Compra.create({ userId, nombre, itemComprado });
    res.json(newCompra);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear compra' });
  }
};

// Actualizar una compra por ID
exports.updateCompra = async (req, res) => {
  const compraId = req.params.id;
  const updatedCompra = req.body;

  try {
    const compra = await Compra.findByIdAndUpdate(compraId, updatedCompra, { new: true });
    if (!compra) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }
    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar compra' });
  }
};

// Eliminar una compra por ID
exports.deleteCompra = async (req, res) => {
  const compraId = req.params.id;

  try {
    const compra = await Compra.findByIdAndDelete(compraId);
    if (!compra) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }
    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar compra' });
  }
};
