import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURL: string = process.env.MONGODB_URI || "";

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURL).then((data: any) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(`Error: ${error}`);
    setTimeout(connectDB, 5000);
  }
};
