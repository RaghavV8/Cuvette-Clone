const ErrorResponse  = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

//check if user is authenticatd
exports.isAuthenticated = async (req,res,next)=>{
    console.log("Cookies received in request:", req.cookies);
console.log("Token received:", req.cookies?.token);

    const token  = req.cookies?.token; //Get token from HTTP-only cookies
    //Make sure tokens exists
    if(!token){
        return next(new ErrorResponse("Not authorised to access this route",400));
    }

    try {
        //Verify token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
             console.log("Decoded Token:", decoded); // ✅ Debugging
             console.log("User Found in DB:", req.user); // ✅ Debugging

        if(!req.user){
            return next(new ErrorResponse("User Not Found",399))
        }

        next();
    } catch (error) {
         console.error("JWT Verification Error:", error); 
       return next(new ErrorResponse("Not authorized to access this route", 400)); 
    }
}

//middleware for admin
exports.isAdmin = (req,res,next)=>{
    if(req.user.role === -1){
        return next(new  ErrorResponse("Access denied you must be an admin to access this"),400);
    }
    next();
}

//middleware for employer routes
exports.isEmployer = (req,res,next)=>{
 console.log("User in isEmployer Middleware:", req.user);

  if (!req.user) {
        return res.status(400).json({ success: false, error: "User is not authenticated" });
    }

    if (req.user.role !== 1) { // ✅ Ensure this is correct
        return res.status(400).json({ success: false, error: "Access denied! Only Employers can post jobs!" });
    }
    next();
}