import {app} from './app.js'
import  dotenv from 'dotenv'
import { connectDB } from './utils/db.js'
import {v2 as cloudinary} from 'cloudinary'

dotenv.config()

// cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
    
})
// create server
app.listen(process.env.PORT || 9000, ()=>{
    console.log(`Server is running on port ${process.env.PORT || 9000}`)
    connectDB()
})