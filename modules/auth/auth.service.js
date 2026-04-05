import {User} from '../../database/model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req , res) =>{
    const {name , email , password , phone} = req.body;
    const user = await User.findOne({email});
    if(user) return res.status(400).json({message:"this user is already exists !"});
    const hashedPassword = await bcrypt.hash(password,10);    
    const newUser = await User.create({name , email , password:hashedPassword , phone});
    if(!newUser) return res.status(500).json({message:"Internal server error !"});
    res.status(201).json({message:"user created successfully",data: newUser});
}

export const login = async (req , res) =>{
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message:"this e-mail is incorrect !"});
    const isUser = await bcrypt.compare(password , user.password);
    if(!isUser) return res.status(404).json({message:"User password is incorrect"});
    const secretKey = "DASHBOARD2026";
    const userId = user._id;
    const token = jwt.sign({userId},secretKey);
    res.status(200).json({message:"success",data:{token}});    
}