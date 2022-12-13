const express = require('express');
const router = express.Router();
const controller = require('../Controllers/chatController');


router.post('/', controller.createChat);
router.get('/:userId', controller.userChat);
router.get('/find/:firstId/:secondId', controller.findChat);


module.exports = router;