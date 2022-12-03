const mongoose = require('mongoose');
const Schema = mongoose.Schema
const validator = require('validator');
const bycrpt = require('bcrypt');



const UserModel = new Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true, index: true },
        password: { type: String, required: true },
        picture: { type: String },
        newMessage: { type: Object, default: {} },
        status: { type: String, default: "Online" } 
    },
    { minimize: true, timestamps: true },
)

const User = mongoose.model('User', UserModel);