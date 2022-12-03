const User = require('../Models/userModels');

// User SignUp

const userSigup = async (req, res) => {
    const { userName, email, password, picture } = req.body;
    console.log(req.body);

    try {
        const user = await User.signUp(userName, email, password, picture)

        res.status(200).json({user})
    } catch(error) {
        res.status(400).json({error : error.message})
    }


    
   
}


// User Login

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);
        user.status = 'Online';
        await user.save();
        res.status(200).json(user)
    } catch (error)
    {
        res.status(400).json({error: error.message})
    } 
    
} 


module.exports = 
{
    userSigup, 
    userLogin
}