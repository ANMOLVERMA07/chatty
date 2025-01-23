import jwt from "jsonwebtoken";

export const generateToken = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d",
    });

    console.log("token",token);
    

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, 
        sameSite: "strict", 
        secure: process.env.NODE_ENV !== "development",
        // path: "/", // Ensure path is correct
        domain: "https://chatty-edrt.onrender.com/" // Adjust domain if necessary
    });
    console.log("this");
    
    console.log("Set-Cookie Header:", res.getHeader('Set-Cookie'));
    return token;
}