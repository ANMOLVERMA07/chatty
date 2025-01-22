import { Router } from "express";

import { signup,login,logout,checkAuth,updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.protectRoute.js";

const router = Router();

router.get("/signup",signup);
router.get("/login",login);
router.get("/logout",logout);

router.get("/check",protectRoute,checkAuth);
router.put("/update-profile",protectRoute,updateProfile)


export default router;