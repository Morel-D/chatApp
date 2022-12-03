const express = require('express');
const router = express.Router();
const controller = require('../Controllers/userController')

// SignUp
router.post('/Sigup', controller.userSigup);

// Login
router.post('/Login', controller.userLogin);

module.exports = router;