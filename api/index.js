import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';


const password = encodeURIComponent("Nsw@2024");

let url= `mongodb+srv://senli:${password}@mern.yinvcgv.mongodb.net/MERN?retryWrites=true&w=majority&appName=MERN`
mongoose.connect(url)

const app = express();
app.use(express.json());
app.use(cookieParser())

app.listen(3000,()=>{
    console.log('Server is running on port 3000.')
})

// Route
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

//middleware function for handle errors
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

