import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/db.js";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app,server} from "./utils/socket.js";
dotenv.config();


app.use(cookieParser());

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const PORT = process.env.PORT || 8888;

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

server.listen(PORT, () => {
    console.log(`SERVER IS STARTED AT PORT:${PORT}`);
    connectDB();   
})