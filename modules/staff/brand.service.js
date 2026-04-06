import slugify from 'slugify';
import { Brand } from '../../database/model/brand.model.js';
import { uploadImageToCloudinary } from '../../utilts/cloudinary.js';

export const createBrand = async (req, res) => {
  const {name} = req.body;
  let image;
  if (req.file) {
  try {
    image = await uploadImageToCloudinary(req.file.buffer, "Brands");
  } catch (err) {
    return res.status(500).json({ message: "Image upload failed" });
  }
}
  const slug = slugify(name, { lower: true });
  const isBrand = await Brand.findOne({ slug });
  if (isBrand) return res.status(400).json({ message: "This brand is already exists" });
  const brand = await Brand.create({ name, slug, image });
  res.status(201).json({ message: "success", data: { brand } });
}

export const getAllBrands = async (req , res) =>{
    const brands = await Brand.find();
    if(brands.length <= 0) return res.status(400).json({message:"No brands at this time"});
    res.status(200).json({message:"success",data:{brands}});
}

export const getBrandById = async (req , res) =>{
    const {id} = req.params;
    const brand = await Brand.findById(id);
    if(!brand) return res.status(404).json({message:"this brand is not exists"});
    res.status(200).json({message:"success",data:{brand}});
}

export const updateBrand = async (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  let image;
  const brand = await Brand.findById(id);
  if(!brand) return res.status(404).json({ message: "This brand is not exists" });
  if (req.file) {
  try {
    image = await uploadImageToCloudinary(req.file.buffer, "Brands");
  } catch (err) {
    return res.status(500).json({ message: "Image upload failed" });
  }
}
  const slug = slugify(name, { lower: true });
  const isBrand = await Brand.findOne({ slug });
  if (isBrand) return res.status(400).json({ message: "There is a brand with same name!!" });
  const updatedBrand = await Brand.findByIdAndUpdate(brand._id,{ name, slug, image },{returnDocument:"after"});
  res.status(201).json({ message: "success", data: { updatedBrand } });
}

export const deleteBrand = async (req , res) =>{
    const {id} = req.params;
    const brand = await Brand.findById(id);
    if(!brand) return res.status(404).json({message:"this brand is not exists"});
    await Brand.findByIdAndDelete(brand._id);
    res.status(200).json({message:"success"});
}