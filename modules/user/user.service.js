import {User} from '../../database/model/user.model.js';
import bcrypt from 'bcrypt';

export const register = async (req , res) =>{
    const {name , email , password , phone} = req.body;
    const user = await User.findOne({email});
    if(user) return res.status(400).json({message:"this user is already exists !"});
    const hashedPassword = await bcrypt.hash(password,10);    
    const newUser = await User.create({name , email , password:hashedPassword , phone});
    if(!newUser) return res.status(500).json({message:"Internal server error !"});
    res.status(201).json({message:"user created successfully",data: newUser});
}