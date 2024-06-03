import bcryptjs from 'bcryptjs';
import User from '../models/user.models.js';
import { Mongoose } from 'mongoose';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next) =>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json("User Created Successfully.");
    } catch(e) {
        next(e);
    }
};

export const signin = async (req,res,next) =>{
    const {email, password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User Not Found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401,'Wrong Credentals!'));

        const token = jwt.sign({id: validUser._id}, 'secret')
        const {password: pass, ...rest} = validUser._doc;

        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
    } catch(e) {
        next(e);
    }
};