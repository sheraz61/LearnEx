import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import OrderModel, { IOrder } from "../models/order.model.js";
import userModel from "../models/user.model.js";
import CourseModel, { ICourse } from "../models/course.model.js";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail.js";
import NotificationModel from "../models/notification.model.js";
import { redis } from "../utils/redis.js";
import { newOrder } from "../services/order.service.js";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
   
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const courseExistInUser = user.courses.some(
        (course) => course.courseId.toString() === courseId,
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400),
        );
      }

      const course: ICourse | null = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData },
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user.courses.push({
        courseId: course._id.toString(),
      });
      
      await user?.save();
      await redis.set(user?._id.toString(), JSON.stringify(user));

      await NotificationModel.create({
        userId: user?._id.toString(),
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });

      course.purchased = (course.purchased ?? 0) + 1;
      
      await course.save();
      await newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
