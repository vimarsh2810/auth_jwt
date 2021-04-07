const authController = require('../controllers/authentication');

const { Router } = require('express');

const router = Router();

router.post('/signup', authController.signup);

module.exports = router;