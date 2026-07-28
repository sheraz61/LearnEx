import { Response } from "express"
import userModel from "../models/user.model.js"
import { redis } from "../utils/redis.js"


// get user by id
export const getUserById = async (id:any,res:Response)=>{
const userJson = await redis.get(id)
if (userJson){
    const user = JSON.parse(userJson)
    res.status(201).json({
    success:true,
    user
})
}}