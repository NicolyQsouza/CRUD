const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const router = express.Router();

// Rotas para gerenciar usuários
router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsers); // Adicione esta rota
router.get('/new', userController.renderCreateForm);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/:id/edit', userController.renderEditForm);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;
