import {app} from './app.js'
import  dotenv from 'dotenv'

dotenv.config()


// create server
app.listen(process.env.PORT || 9000, ()=>{
    console.log(`Server is running on port ${process.env.PORT || 9000}`)
})