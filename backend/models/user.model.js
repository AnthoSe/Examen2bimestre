// user.model.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  contrasenia: {
    type: String,
    required: true
  },
  cargo: {
    type: String,
    enum: ['admin', 'cliente','Operador'],
    default: 'cliente'
  }
},{
  timestamps:true
}
);


module.exports = model('User', userSchema);
