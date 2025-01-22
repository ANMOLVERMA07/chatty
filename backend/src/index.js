import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

app.listen(PORT, () => {
    console.log(`SERVER IS STARTED AT PORT:${PORT}`);   
})