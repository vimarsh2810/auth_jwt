const authController = require('../controllers/authentication');
const { checkEmailInUse, checkEmailExist } = require('../middlewares/validateEmail');
const { checkAuth, verifyToken } = require('../middlewares/validateToken');

const { Router } = require('express');

const router = Router();

router.post('/signup', checkEmailInUse, authController.signup);

router.post('/login', checkEmailExist, authController.login);

router.get('/landingPage', checkAuth, verifyToken, authController.landingPage);

module.exports = router;