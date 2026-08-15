import { app } from "./app.js";

import { connectDB } from "./utils/db.js";



// create server
app.listen(process.env.PORT || 9000, ()=>{
    console.log(`Server is running on port ${process.env.PORT || 9000}`)
    connectDB()
})



