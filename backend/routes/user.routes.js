const express = require('express');
const router = express.Router();
const User = require('../models/user.model'); // Asegúrate de que la ruta sea correcta
const usersController = require('../controller/user.controller');

// Crear un nuevo usuario
router.post('/registro', usersController.createUser);

// Iniciar sesión
router.post('/signIn', usersController.SigIn);

// Verificar correo
router.get('/verificarCorreo/:correo', usersController.emailverification);

// Obtener el rol del usuario
router.get('/getUserRole', usersController.getUserRole);

// Obtener todos los usuarios
router.get('/getAllUsers', usersController.getAllUsers);

// Obtener un usuario por ID
router.get('/getUserById/:userId', usersController.getUserById);

// Actualizar la información de un usuario
router.put('/updateUser/:userId', usersController.updateUser);

// Eliminar un usuario por ID
router.delete('/deleteUser/:userId', usersController.deleteUser);

// Actualizar la contraseña
router.put('/updatePassword/:userId', usersController.updatePassword);

router.post('/signIn', (req, res) => {
    // Lógica para verificar las credenciales del usuario
    // ...
  
    // Si las credenciales son válidas, genera el token
    const token = jwt.sign({ userId: usuario._id }, 'secreto', { expiresIn: '1h' });
  
    // Envia el token como parte de la respuesta
    res.json({ token });
  });

module.exports = router;
