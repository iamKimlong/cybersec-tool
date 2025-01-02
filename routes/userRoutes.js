const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.renderLoginForm);
router.post('/login', authController.login);
router.get('/register', authController.renderRegisterForm);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

module.exports = router;