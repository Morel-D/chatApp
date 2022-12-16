const chatModel = require('../Models/ChatModel');
const mongoose = require('mongoose');


// Create a chat
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


// Find a userchart
const userChat = (req, res) => {

    const userID = {members: {$in: [req.params.userId]}}
    chatModel.find(userID).then((chat) => {
        res.status(200).json(chat)
    }).catch((error) => {
        res.status(400).json(error.message)
    })

}



const findChat = (req, res) => {

    const firstID = mongoose.Types.ObjectId(req.params.firstId);
    const  secondID = mongoose.Types.ObjectId(req.params.secondId);

    chatModel.findById(firstID, secondID)
        .then((chat) => {
        res.status(200).json(chat)
    }).catch((error) => {
        res.status(400).json(error.message)
    })
}

module.exports = {
    createChat, userChat, findChat
}