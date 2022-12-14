const messageModel = require('../Models/MessageModel');
const mongoose = require('mongoose');


const addMessage = (req, res) => {
    const { chatId, senderId, text } = req.body;
    const message = new messageModel({ chatId, senderId, text });
    message.save()
    
    messageModel.find()
        .then((results) => {
        res.status(200).json(results)
        }).catch((error) => {
        res.status(200).json(error.message)
    })

}


const getMessage = (req, res) => {
    const { chatId } = req.params;

    messageModel.find({ chatId })
        .then((results) => {
        res.status(200).json(results)
        }).catch((error) => {
        res.status(400).json(error.message)
    })
}


module.exports = { addMessage, getMessage }