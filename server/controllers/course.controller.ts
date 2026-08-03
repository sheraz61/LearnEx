import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service.js";
import CourseModel from "../models/course.model.js";
import { redis } from "../utils/redis.js";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import sendMail from "../utils/sendMail.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// upload course
export const uploadCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "coursesL",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      await createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

// edit course
export const editCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      const courseId = req.params.id;
      if (!courseId) {
        return new ErrorHandler("Course Id not found", 404);
      }
      const courseData = (await CourseModel.findById(courseId)) as any;

      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "coursesL",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (thumbnail) {
        data.thumbnail = {
          public_id: courseData?.thumbnail.public_id,
          url: courseData?.thumbnail.url,
        };
      }

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true },
      );
      await redis.set(courseId.toString(), JSON.stringify(course)); // update course in redis
      res.status(201).json({
        success: true,
        message: "Course update Successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

// get single course --- without purchasing
export const getSingleCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      if (!courseId) {
        return new ErrorHandler("Course not found", 404);
      }
      const isCacheExist = await redis.get(courseId.toString());

      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(req.params.id as string),
            },
          },
          {
            $project: {
              "courseData.videoUrl": 0,
              "courseData.links": 0,
              "courseData.questions": 0,
              "courseData.suggestion": 0,
            },
          },
        ]);

        await redis.set(
          courseId.toString(),
          JSON.stringify(course),
          "EX",
          604800,
        ); // 7days

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

// get all courses --- without purchasing
export const getAllCourses = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await CourseModel.aggregate([
        {
          $project: {
            "courseData.videoUrl": 0,
            "courseData.suggestion": 0,
            "courseData.questions": 0,
            "courseData.links": 0,
          },
        },
      ]);

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

// get course content -- only for valid user
export const getCourseByUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId,
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 404),
        );
      }

      const course = await CourseModel.findById(courseId);

      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

// add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;
      const course = await CourseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const couseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId),
      );

      if (!couseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      // create a new question object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      // add this question to our course content
      couseContent.questions.push(newQuestion);

      // save the updated course
      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

// add answer in course question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnwser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId }: IAddAnswerData =
        req.body;

      const course = await CourseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const couseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId),
      );

      if (!couseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const question = couseContent?.questions?.find((item: any) =>
        item._id.equals(questionId),
      );

      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }

      // create a new answer object
      const newAnswer: any = {
        user: req.user,
        answer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // add this answer to our course content
      if (!question.questionReplies) {
        question.questionReplies = [];
      }
      question.questionReplies.push(newAnswer);

      await course?.save();

      if (req.user?._id === question.user._id) {
        // create a notification
      } else {
        const data = {
          name: question.user.name,
          title: couseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data,
        );

        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
