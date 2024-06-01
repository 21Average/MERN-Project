import bcryptjs from 'bcryptjs';
import User from '../models/user.models.js';

export const signup = async (req,res) =>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json("User Created Successfully.")
    } catch(e) {
        res.status(500).json(e.message)
    }
};