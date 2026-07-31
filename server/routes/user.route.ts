import express from "express";

import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updatePassword,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.post("/registration", registerUser);
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/refresh", updateAccessToken);
router.get("/me", isAuthenticated,getUserInfo);
router.get("/social-auth",socialAuth);
router.put("/update-user-info",isAuthenticated,updateUserInfo);
router.put("/update-user-password",isAuthenticated,updatePassword);


export default router;
