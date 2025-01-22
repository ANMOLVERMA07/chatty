import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/db.js";
import cors from "cors";

dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app,server} from "./utils/socket.js";

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(
    cors({
      origin: "http://127.0.0.1:5173",
      credentials: true,
    })
);

const PORT = process.env.PORT;

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

server.listen(PORT, () => {
    console.log(`SERVER IS STARTED AT PORT:${PORT}`);
    connectDB();   
})