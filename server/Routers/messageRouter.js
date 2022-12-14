const express = require('express');
const router = express.Router();
const controller = require('../Controllers/messageController');

router.post('/', controller.addMessage);
router.get('/:chatId', controller.getMessage);

module.exports = router;