import slugify from 'slugify';
import { Category } from '../../database/model/category.model.js';
import { uploadImageToCloudinary } from '../../utilts/cloudinary.js';

export const createCategory = async (req, res) => {
  const {name} = req.body;
  let image;
  if (req.file) {
  try {
    image = await uploadImageToCloudinary(req.file.buffer, "categories");
  } catch (err) {
    return res.status(500).json({ message: "Image upload failed" });
  }
}
  const slug = slugify(name, { lower: true });
  const isCategory = await Category.findOne({ slug });
  if (isCategory) return res.status(400).json({ message: "This category is already exists" });
  const category = await Category.create({ name, slug, image });
  res.status(201).json({ message: "success", data: { category } });
}

export const getAllCategories = async (req , res) =>{
    const categories = await Category.find();
    if(categories.length <= 0) return res.status(400).json({message:"No categories at this time"});
    res.status(200).json({message:"success",data:{categories}});
}

export const getCategoryById = async (req , res) =>{
    const {id} = req.params;
    const category = await Category.findById(id);
    if(!category) return res.status(404).json({message:"this category is not exists"});
    res.status(200).json({message:"success",data:{category}});
}

export const getSubCategoriesByCategory = async (req , res) =>{
    const {id} = req.params;
    const category = await Category.findById(id).populate("subcategory");
    if(!category) return res.status(404).json({message:"this category is not exists"});
    res.status(200).json({message:"success",data:{subcategories:category.subcategory}});
 }   

export const updateCategory = async (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  let image;
  const category = await Category.findById(id);
  if(!category) return res.status(404).json({ message: "This category is not exists" });
  if (req.file) {
  try {
    image = await uploadImageToCloudinary(req.file.buffer, "categories");
  } catch (err) {
    return res.status(500).json({ message: "Image upload failed" });
  }
}
  const slug = slugify(name, { lower: true });
  const isCategory = await Category.findOne({ slug });
  if (isCategory) return res.status(400).json({ message: "There is a category with same name!!" });
  const updatedCategory = await Category.findByIdAndUpdate(category._id,{ name, slug, image },{returnDocument:"after"});
  res.status(201).json({ message: "success", data: { updatedCategory } });
}

export const deleteCategory = async (req , res) =>{
    const {id} = req.params;
    const category = await Category.findById(id);
    if(!category) return res.status(404).json({message:"this category is not exists"});
    category.isDeleted = true;
    category.deletedAt = new Date();
    await category.save();
    res.status(200).json({message:"success"});
}