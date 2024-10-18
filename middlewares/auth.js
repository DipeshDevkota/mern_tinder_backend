const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async(req,res,next)=>{
    try {
        const cookies= req.cookies;
        if (!cookies || !cookies.token) {
            return res.status(400).json({ message: "Token is not provided!" });
        }
        const {token}= cookies;

        if(!token)
        {
            return res.status(400).json({message:"Token is not valid!!!"});
        }

        const decodedMessage= await jwt.verify(token,"Dipesh78$");

        const {_id}= decodedMessage;
        const user = await User.findById(_id);
        if(!user)
        {
            return res.status(400).json({message:"User is not found!!!"});

        }
        req.user= user;
        next()
    } catch (error) {
        res.status(400).send("Error:",error.message)
        
    }
}

module.exports={userAuth}