import { Router } from "express";
import { protectRoute } from "../middlewares/auth.protectRoute.js";
import { getUsersForSidebar,getMessages,sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.get("/messages/:id",protectRoute,getMessages);
router.get("/users",protectRoute,getUsersForSidebar);
router.post("/send/:id",protectRoute,sendMessage);



export default router;