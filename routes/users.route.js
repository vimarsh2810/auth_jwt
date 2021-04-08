const usersController = require('../controllers/usersController');

const { Router } = require('express');

const router = Router();

// GET - get all registered users
router.get('/', usersController.getAllUsers);

// GET - get user by id
router.get('/id/:id', usersController.getUserById);

// GET - get user by email
router.get('/email/:email', usersController.getUserByEmail);

module.exports = router;