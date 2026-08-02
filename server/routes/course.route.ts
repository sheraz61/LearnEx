import express from "express";

import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { editCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller.js";

const router = express.Router();
router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse,
);
router.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse,
);
router.get(
  "/get-course/:id",
  getSingleCourse,
);
router.get(
  "/get-courses",
  getAllCourses,
);
router.get(
  "/get-course-content/:id",
  isAuthenticated,
  getCourseByUser,
);


export default router;
