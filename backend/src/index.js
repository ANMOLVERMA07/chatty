import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/db.js";
import cors from "cors";

import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app,server} from "./utils/socket.js";
dotenv.config();


app.use(cookieParser());

app.use(
    cors({
      origin: "http://localhost:5173" ,
      credentials: true,
    })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const PORT = process.env.PORT || 8888;
const __dirname = path.resolve();

// app.get("/", (req, res) => {
//   res.send("Welcome to Chatty!");
// });
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));


app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
})
  
}

server.listen(PORT, () => {
    console.log(`SERVER IS STARTED AT PORT:${PORT}`);
    connectDB();   
})