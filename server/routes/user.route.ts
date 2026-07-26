import express from "express";

import { registerUser ,activateUser, loginUser, logoutUser} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.post("/registration", registerUser);
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.get("/logout",isAuthenticated, logoutUser);

export default router;
