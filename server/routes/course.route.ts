import express from "express";

import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { uploadCourse } from "../controllers/course.controller.js";

const router = express.Router();
router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse,
);

export default router;
