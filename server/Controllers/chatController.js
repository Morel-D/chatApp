const chatModel = require('../Models/ChatModel');
const mongoose = require('mongoose');

const createChat = (req, res) => {

    const newChat = new chatModel({
        members: [ req.body.senderId, req.body.reciverId]
    })

    newChat.save()

    chatModel.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
        res.status(400).json(error.message)
    })

}


const userChat = (req, res) => {

    const id = mongoose.Types.ObjectId(req.params.userId);
    chatModel.findById(id).then((chat) => {
        res.status(200).json(chat)
    }).catch((error) => {
        res.status(400).json(error.message)
    })

}

const findChat = (req, res) => {

    const firstId = mongoose.Types.ObjectId(req.params.firstId);
    const  secondId = mongoose.Types.ObjectId(req.params.secondId);

    chatModel.findOne(firstId, secondId).then((chat) => {
        res.status(200).json(chat)
    }).catch((error) => {
        res.status(400).json(error.message)
    })
}

module.exports = {
    createChat, userChat, findChat
}