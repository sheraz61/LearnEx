import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/error.js";
import userRouter from './routes/user.route.js'
import courseRouter from './routes/course.route.js'
import orderRouter from './routes/order.route.js'
import notificationRouter from './routes/notification.route.js'
import analyticsRouter from './routes/analytics.route.js'
import layoutRouter from './routes/layout.route.js'
dotenv.config();

export const app = express();
//body parser middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true , limit: "50mb"}));
// cookie parser middleware
app.use(cookieParser());
// cross origin resoruce sharing
app.use(
  cors({
    origin:['http://localhost:3000','http://localhost:3001'],
    credentials: true
  }),
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Learnex API",
  });
});

// routes
app.use('/api/v1',userRouter)
app.use('/api/v1',courseRouter)
app.use('/api/v1',orderRouter)
app.use('/api/v1',notificationRouter)
app.use('/api/v1',analyticsRouter)
app.use('/api/v1',layoutRouter)
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