import Message from "../models/message.model.js";
import User from "../models/auth.model.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from "../utils/cloudinary.js";
import { getReceiverSocketId } from "../utils/socket.js";
import { io } from "../utils/socket.js";

export const getMessages = async(req,res) => {
    try {
        const {id:myId} = req.params.id;
        const loginUserId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:loginUserId},
                {senderId:loginUserId,receiverId:myId}
            ]
        });

        res.status(StatusCodes.OK).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
}

export const getUsersForSidebar = async(req,res) => {
    try {
        const userId = req.user._id;
        const allUsers = await User.find({ _id:{$ne:userId}}).select("-password");
        res.status(StatusCodes.OK).json(allUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async(req,res) => {
    try {
        const {text,image} = req.body;
        const myId = req.user._id;
        const samneWalekiId = req.params.id;

        let imageUrl;
        if(imageUrl){
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId:myId,
            receiverId:samneWalekiId,
            text,
            image:imageUrl
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }


        res.status(StatusCodes.CREATED).json(newMessage);
        

    } catch (error) {
        console.error("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
}