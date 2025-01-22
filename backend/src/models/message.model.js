import mongoose, {Schema,model} from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    }
},{timestamps:true});

const Message = model("Message",messageSchema);

export default Message;