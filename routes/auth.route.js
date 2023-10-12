const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller')
router.post('/auth', authController.loginWithEmail);
router.post('/register', authController.register);
router.post('/update-profile', authController.updateUser);
router.post('/update-password', authController.updatePassword);
router.post('/login-with-mobile', authController.loginWithMobile);
router.post('/verify-mobile-otp', authController.verifyMobileOtp);

module.exports = router;