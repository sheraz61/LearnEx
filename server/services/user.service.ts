import { Response } from "express"
import userModel from "../models/user.model.js"


// get user by id
export const getUserById = async (id:any,res:Response)=>{
const user = await userModel.findById(id)
res.status(201).json({
    success:true,
    user
})
}