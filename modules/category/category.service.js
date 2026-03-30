import slugify from 'slugify';
import { Category } from '../../database/model/category.model.js';


export const createCategory = async (req , res) =>{
//    const imageCover = req.body.image ? image : null;
    const {name} = req.body;
    const slug = slugify(name,{lower: true});
    const isCategory = await Category.findOne({slug});
    if(isCategory) return  res.status(400).json({message:"This category is already exists"});
    const category = await Category.create({name,slug});
    res.status(201).json({message:"success",data:{category}});
}
