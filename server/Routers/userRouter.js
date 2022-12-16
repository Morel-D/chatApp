const express = require('express');
const router = express.Router();
const controller = require('../Controllers/userController')

// SignUp
router.post('/signup', controller.userSigup);

// Login
router.post('/login', controller.userLogin);

// get users 
router.get('/users', controller.getUsers);

// Get one user
router.get('/user/:id', controller.getSingleUser);

module.exports = router;