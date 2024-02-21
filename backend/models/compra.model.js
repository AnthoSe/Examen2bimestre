// compra.model.js
const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  itemComprado: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Compra', compraSchema);
