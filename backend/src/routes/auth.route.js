import { Router } from "express";

import { signup,login,logout,checkAuth,updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.protectRoute.js";

const router = Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.get("/check",protectRoute,checkAuth);
router.put("/update-profile",protectRoute,updateProfile)


export default router;