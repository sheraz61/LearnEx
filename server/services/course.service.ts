import { Response } from "express";
import CourseModel from "../models/course.model.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
// create course
export const createCourse = catchAsyncError(async(data:any,res:Response)=>{
    const course = await CourseModel.create(data);
    res.status(201).json({
        success:true,
        course
    });
})


// Get All courses
export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};