import User from "../models/auth.model.js";
import {StatusCodes} from "http-status-codes";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = async(req,res) => {
    const {fullName,email,password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"All Fields are required"});
        }

        if(password.length < 6){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Password must be atleast 6 characters"});
        }

        const isEmail = await User.findOne({email});
        if(isEmail){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Already account exist.Please Login"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(StatusCodes.CREATED).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePicture:newUser.profilePicture,
            });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"}); 
    }
};

export const login = async(req,res) => {
    const {email,password} = req.body;
    try {
        if(!email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json("All fields are required");
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({message:"Please Signup First"});
        }

        const debug = await bcrypt.compare(password,user.password);
        if(!debug){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Incorrect Password"});
        }

        generateToken(user._id,res);
        res.status(StatusCodes.ACCEPTED).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePicture:user.profilePicture,
        });
    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"}); 
    }
};

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(StatusCodes.OK).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"}); 
    }
}

export const checkAuth = (req,res) => {
    try {
        res.status(StatusCodes.OK).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller",error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"}); 
    }
}

export const updateProfile = async(req,res) => {
    try {
        const {profilePicture} = req.body;
        const userId = req.user._id;

        if(!profilePicture){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"profile picture not found"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
        const selectedUser = await User.findByIdAndUpdate(userId,{profilePicture:uploadResponse.secure_url},{new:true});

        res.status(StatusCodes.OK).json(selectedUser);
    } catch (error) {
        console.log("Error in update-profile controller",error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"}); 
    }
}