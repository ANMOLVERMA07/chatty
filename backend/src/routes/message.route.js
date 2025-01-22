import { Router } from "express";
import { protectRoute } from "../middlewares/auth.protectRoute";
import { getUsersForSidebar,getMessages,sendMessage } from "../controllers/message.controller";

const router = Router();

router.get("/messages/:id",protectRoute,getMessages);
router.get("/users",protectRoute,getUsersForSidebar);
router.post("/send/:id",protectRoute,sendMessage);



export default router;