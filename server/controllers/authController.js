
const User = require('../models/userModel')
const ErrorResponse = require("../utils/errorResponse")

exports.signup = async (req,res,next) =>{
    const {email} = req.body;
    const userExist = await User.findOne({email});
    if (userExist){
        return next(new ErrorResponse("E-mail already registered", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

exports.signin = async (req,res,next) =>{
    try {
        //validation
        const { email , password } = req.body;
        if(!email){
        return next(new ErrorResponse("please add an email", 403));
        }
        if(!password){
        return next(new ErrorResponse("please add a password", 403));
        }
        //check user email  
        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("Invalid Credentials", 403))
        }
        //check password
        const isMatched = await user.comparePassword(password)
            if(!isMatched){
                return next(new ErrorResponse("Invalid credentials", 403))
            } 

            sendTokenResponse(user, 200, res);

    } catch (error) {
        next(error);
    }
}

const sendTokenResponse = async(user,codeStatus, res)=>{

    if(!user){
        return res.status(400).json({ success: false, error: "User is undefined" });
    }
    
    const token = await user.getJwtToken();

     if (!token) {
        return res.status(400).json({ success: false, error: "Token generation failed" });
    }
    console.log("Setting Cookie: Token =", token);

    //Setting Cookie Options
    const options = {
        httpOnly: true, // Prevents Javascript access (More secure than localStorage)
        secure: process.env.NODE_ENV === "production", // Works only in HTTPS in production
        sameSite: "Lax", // Allows sending cookies only for same-site requests
        maxAge: 60*60*1000, // 1 Hour Cookie Age 
    };

    res.status(codeStatus)
        .cookie('token',token, {maxAge: 60*60*1000, httpOnly: true }) // if on production you can use https for secure connection
         .json({success:true, token, user})
};



//log out
exports.logout = (req,res,next)=>{
    res.clearCookie('token'); //Properly removes the authentication cookie
    res.status(200).json({
        success:true,
        message: "logged out"
    })
}

//user profile
exports.userProfile = async (req,res,next)=>{
    // Requesting user ID from the auth.js
    
    const user = await  User.findById(req.user.id).select('-password');

    res.status(200).json({
        success:true,
        user
    })
}

