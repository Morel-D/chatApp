const mongoose = require('mongoose');
const Schema = mongoose.Schema
const validator = require('validator');
const bycrpt = require('bcrypt');



const UserModel = new Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        picture: { type: String },
        newMessage: { type: Object, default: {} },
        status: { type: String, default: "Online" } 
    },
    { minimize: true, timestamps: true },
)


// SignUp Procedure

UserModel.statics.signUp = async function(userName, email, password, picture)
{
    // validators

    if (!email || !userName || !password)
    {
        throw Error("All feilds must be filled")
    }
    
    if (!validator.isEmail(email))
    {
        throw Error("Invalid Email")
    }

    const exist = await User.findOne({ email })
    
    if (exist)
    {
        throw Error("Email Already Exist")
    }
    
    const salt = await bycrpt.genSalt(10);
    const hash = await bycrpt.hash(password, salt);

    const user = await this.create({ userName, email, password: hash, picture })

    return user; 
}
    

    

// Login Procedure

UserModel.statics.findByCredentials = async function (email, password)
{
    const user = await User.findOne({ email });
    if (!user) throw Error("Invalid Email")
    
    const isMatch = await bycrpt.compare(password, user.password);
    if (!isMatch) throw Error("Invalide Password");

    return user

}


const User = mongoose.model('User', UserModel);

module.exports = User;