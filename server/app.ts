import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/error.js";
import userRouter from './routes/user.route.js'


dotenv.config();

export const app = express();
//body parser middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieParser());
// cross origin resoruce sharing
app.use(
  cors({
    origin: process.env.ORIGIN?.split(","),
    // credentials: true
  }),
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Learnex API",
  });
});

// routes
app.use('/api/v1/user',userRouter)
// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// unknown routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error(
    `Can't find ${req.originalUrl} on this server!`,
  ) as Error & { statusCode: number };

  err.statusCode = 404;

  next(err);
});

// error middleware
app.use(errorMiddleware);