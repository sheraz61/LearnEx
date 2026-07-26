import dotenv from "dotenv";

import { Response } from "express";
import { IUser } from "../models/user.model.js";
import { redis } from "./redis.js";

dotenv.config();

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

 // parse environment varibales to integrates with fallback values
  const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300',10)
  const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200',10)

  // options for cookies
  export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
  };

  export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire *24*60*60* 1000),
    maxAge: refreshTokenExpire*24 *60*60* 1000,
    httpOnly: true,
    sameSite: 'lax',
  };

export const  sendToken = async (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  // upload session to redis

await redis.set(user._id.toString(),JSON.stringify(user)  as any)
   
  
  // only set secure flag in production
  if (process.env.NODE_ENV === 'production') {
    accessTokenOptions.secure = true;
  }

  res.cookie('access_token', accessToken, accessTokenOptions);
  res.cookie('refresh_token', refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    accessToken,
    user
  });

  
};
