import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/auth",authRoutes);

app.listen(PORT, () => {
    console.log(`SERVER IS STARTED AT PORT:${PORT}`);   
})