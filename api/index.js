import express from 'express';
import mongoose from 'mongoose';


const password = encodeURIComponent("Nsw@2024");

let url= `mongodb+srv://senli:${password}@mern.yinvcgv.mongodb.net/MERN?retryWrites=true&w=majority&appName=MERN`
mongoose.connect(url)

const app = express();

app.listen(3000,()=>{
    console.log('Server is running on port 3000.')
})

