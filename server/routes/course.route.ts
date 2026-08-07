import express from "express";

import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { addAnwser, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller.js";

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
router.put(
  "/add-question",
  isAuthenticated,
  addQuestion,
);
router.put(
  "/add-answer",
  isAuthenticated,
  addAnwser,
);
router.put(
  "/add-review/:id",
  isAuthenticated,
  addReview,
);
router.put(
  "/add-reply",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview,
);
router.get(
  "/get-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCourses,
);
router.delete(
  "/delete-course",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse,
);


export default router;
