import slugify from 'slugify';
import { Subcategory } from '../../database/model/subcategory.model.js';
import { uploadImageToCloudinary } from '../../utilts/cloudinary.js';

export const createSubCategory = async (req, res) => {
  const {name} = req.body;
  let image;
  if (req.file) {
  try {
    image = await uploadImageToCloudinary(req.file.buffer, "subcategories");
  } catch (err) {
    return res.status(500).json({ message: "Image upload failed" });
  }
}
  const slug = slugify(name, { lower: true });
  const isCategory = await Subcategory.findOne({ slug });
  if (isCategory) return res.status(400).json({ message: "This subcategory is already exists" });
  const category = await Subcategory.create({ name, slug, image });
  res.status(201).json({ message: "success", data: { category } });
}

export const getSubCategoryById = async (req , res) =>{
    const {id} = req.params;
    const category = await Subcategory.findById(id);
    if(!category) return res.status(404).json({message:"this subcategory is not exists"});
    res.status(200).json({message:"success",data:{category}});
}

export const updateSubCategory = async (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  let image;
  const category = await Subcategory.findById(id);
  if(!category) return res.status(404).json({ message: "This subcategory is not exists" });
  if (req.file) {
  try {
    image = await uploadImageToCloudinary(req.file.buffer, "subcategories");
  } catch (err) {
    return res.status(500).json({ message: "Image upload failed" });
  }
}
  const slug = slugify(name, { lower: true });
  const isCategory = await Subcategory.findOne({ slug });
  if (isCategory) return res.status(400).json({ message: "There is a subcategory with same name!!" });
  const updatedCategory = await Subcategory.findByIdAndUpdate(category._id,{ name, slug, image },{returnDocument:"after"});
  res.status(200).json({ message: "success", data: { updatedCategory } });
}

export const deleteSubCategory = async (req , res) =>{
    const {id} = req.params;
    const category = await Subcategory.findById(id);
    if(!category) return res.status(404).json({message:"this subcategory is not exists"});
    category.isDeleted = true;
    category.deletedAt = new Date();
    await category.save();
    res.status(200).json({message:"success"});
}