const authController = require('../controllers/authController');
const { checkEmailInUse, checkEmailExist } = require('../middlewares/validateEmail');
const verifyToken = require('../middlewares/validateToken');

const { Router } = require('express');

const router = Router();

// POST - Register new user
router.post('/signup', checkEmailInUse, authController.signup);

// POST - Login with correct credentials
router.post('/login', checkEmailExist, authController.login);

// GET - Details of Logged In User
router.get('/dashboard', verifyToken, authController.dashboard);

module.exports = router;