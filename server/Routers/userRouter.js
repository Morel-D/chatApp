const express = require('express');
const router = express.Router();
const controller = require('../Controllers/userController')

// SignUp
router.post('/signup', controller.userSigup);

// Login
router.post('/login', controller.userLogin);

module.exports = router;