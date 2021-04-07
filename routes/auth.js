const authController = require('../controllers/authentication');
const { checkEmailInUse, checkEmailExist } = require('../middlewares/validateEmail');

const { Router } = require('express');

const router = Router();

router.post('/signup', checkEmailInUse, authController.signup);

router.post('/login', checkEmailExist, authController.login);

module.exports = router;