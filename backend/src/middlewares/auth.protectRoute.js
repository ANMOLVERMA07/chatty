import User from "../models/auth.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async(req,res,next) => {

    try {
        console.log("Cookies:", req.cookies); // Log cookies
        const token = req.cookies.jwt;

        console.log("Request Headers:", req.headers); // Log request headers

        
        console.log("Token from Cookies:", token); // Log token
        

        if(!token){
            return res.status(401).json({message : "Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({message : "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message : "User not found"});
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error in protectRoute middleware ",error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}