const usersController = require('../controllers/usersController');

const { Router } = require('express');

const router = Router();

router.get('/', usersController.getAllUsers);

router.get('/id/:id', usersController.getUserById);

router.get('/email/:email', usersController.getUserByEmail);

module.exports = router;