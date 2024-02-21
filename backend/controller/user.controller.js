// user.controller.js
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const usersController = {};

usersController.createUser = async (req, res) => {
  const { nombre, correo, contrasenia, cargo } = req.body;
  const newUser = new User({ nombre: nombre, correo: correo, contrasenia: contrasenia, cargo: cargo });
  console.log(newUser);
  await newUser.save();
};
usersController.SigIn = async (req, res) => {
  const { correo, contrasenia } = req.body;

  try {
    const user = await User.findOne({ correo, contrasenia }).exec();

    if (user) {
      res.json({ mensaje: 'Inicio de sesión exitoso', cargo: user.cargo });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
usersController.emailverification = async (req, res) => {
  const correo = req.params.correo;

  try {
    const existingUser = await User.findOne({ correo }).exec();

    if (existingUser) {
      res.json(true); // El correo ya existe
    } else {
      res.json(false); // El correo no existe
    }
  } catch (error) {
    console.error('Error al verificar el correo:', error);
    res.status(500).json({ error: 'Error al verificar el correo' });
  }
};
usersController.getUserRole = async (req, res) => {
  res.json({ cargo: req.user ? req.user.cargo : null });
};

// Obtener todos los usuarios
usersController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener todos los usuarios' });
  }
};

// Obtener un usuario por ID
usersController.getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).exec();

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Error al obtener usuario por ID' });
  }
};

// Actualizar la información de un usuario
usersController.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true }).exec();

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario por ID
usersController.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId).exec();

    if (deletedUser) {
      res.json({ mensaje: 'Usuario eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

// ...

usersController.updatePassword = async (req, res) => {
  const userId = req.params.userId;
  const { contraseniaAntigua, nuevaContrasenia } = req.body;

  console.log('ID de usuario:', userId);

  try {
    // Verificar si el userId es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'ID de usuario no válido' });
    }

    // Verificar si el usuario existe en la base de datos
    const user = await User.findById(userId);

    console.log('Usuario encontrado:', user);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña antigua coincide
    const contraseniaAntiguaValida = await bcrypt.compare(contraseniaAntigua, user.contrasenia);

    if (!contraseniaAntiguaValida) {
      return res.status(401).json({ error: 'Contraseña antigua incorrecta' });
    }

    // Hash de la nueva contraseña
    const hashedNuevaContrasenia = await bcrypt.hash(nuevaContrasenia, 10);
    console.log('Contraseña antes de la actualización:', user.contrasenia);
    // Actualizar la contraseña en la base de datos
    user.contrasenia = hashedNuevaContrasenia;
    await user.save();
    // Después de la actualización
    console.log('Contraseña después de la actualización:', user.contrasenia);
    console.log('Contraseña actualizada exitosamente');

    return res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error específico al actualizar la contraseña:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// ...



module.exports = usersController;