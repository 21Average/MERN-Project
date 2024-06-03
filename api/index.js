import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js';


const password = encodeURIComponent("Nsw@2024");

let url= `mongodb+srv://senli:${password}@mern.yinvcgv.mongodb.net/MERN?retryWrites=true&w=majority&appName=MERN`
mongoose.connect(url)

const app = express();
app.use(express.json());

app.listen(3000,()=>{
    console.log('Server is running on port 3000.')
})

// Route
app.use('/api/auth',authRouter)

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

