import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import sendMail from "../utils/sendMail.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
interface IActivationToken {
  token: string;
  activationCode: string;
}
//user activation  token function
const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: "5m",
    },
  );
  return { token, activationCode };
};
export const registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, avatar } = req.body;
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exist", 400));
      }
      const user: IRegistrationBody = {
        name,
        email,
        password,
      };
      const activationObject = createActivationToken(user);
      const activationCode = activationObject.activationCode;
      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation.mail.ejs"),
        data,
      );

      // sending email using nodemailer...
      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation.mail.ejs",
          data,
        });

        res.status(201).json({
          succuss: true,
          message: `Please check your email: ${user.email} to activate your acount`,
          activationToken: activationObject.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  },
);

// activate user
interface IActivationRequest {
  activationToken: string;
  activationCode: string;
}
export const activateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activationToken, activationCode } = req.body;
      const newUser = jwt.verify(
        activationToken,
        process.env.ACCESS_TOKEN_SECRET as string,
      ) as { user: IUser; activationCode: string };
      if (newUser.activationCode !== activationCode) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }
      const { name, email, password } = newUser.user;

      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler("User already exist", 400));
      }

      const user = await userModel.create({
        name,
        email,
        password,
      });
      res.status(201).json({
        success:true,
        message:'User activate successfully'
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  },
);
