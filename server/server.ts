import { app } from "./app.js";
import { initSocketServer } from "./socketServer.js";
import { connectDB } from "./utils/db.js";
import dotenv from 'dotenv'
import http from 'http'
dotenv.config()
const server = http.createServer(app)

initSocketServer(server)
// create server
server.listen(process.env.PORT || 9000, ()=>{
    console.log(`Server is running on port ${process.env.PORT || 9000}`)
    connectDB()
})



