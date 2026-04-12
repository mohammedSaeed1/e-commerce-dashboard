import { Product } from "../../database/model/product.model.js";
import { Brand } from "../../database/model/brand.model.js";
import { Category } from "../../database/model/category.model.js";
import slugify from "slugify";
import { uploadImageToCloudinary } from "../../utilts/cloudinary.js";

export const createProduct = async (req, res) => {
    const { name, description, price, category, brand , stock} = req.body;
    let image;
    const isCategory = await Category.findById(category);
    if (!isCategory) return res.status(404).json({ message: "Category is not found!!!" });
    const isBrand = await Brand.findById(brand);
    if (!isBrand) return res.status(404).json({ message: "Brand is not found!!!" });
    const slug = slugify(name, { lower: true });
    if (req.file) {
        try {
            image = await uploadImageToCloudinary(req.file.buffer, "products");
        } catch (err) {
            return res.status(500).json({ message: "Image upload failed" });
        }
    }
    const product = await Product.create({ name, slug, price, description,stock, category, brand, image });
    if (!product) return res.status(500).json({ message: "Internal server error" });
    res.status(201).json({ message: "success", data: { product } });
}

export const getAllProducts = async (req, res) => {
    const products = await Product.find().populate('category brand');
    if (products.length <= 0) return res.status(400).json({ message: "No products at this time" });
    res.status(200).json({ message: "success", data: products });
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "this product is not exists" });
    res.status(200).json({ message: "success", data: product });
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const { name, description, price , stock} = req.body;
    const isProduct = await Product.findById(id);
    if(!isProduct) return res.status(404).json({message:"Product is not found!!"});
    let image , slug;
    if(name){slug = slugify(name, { lower: true });}
    if (req.file) {
        try {
            image = await uploadImageToCloudinary(req.file.buffer, "products");
        } catch (err) {
            return res.status(500).json({ message: "Image upload failed" });
        }
    }
    const updatedProduct = await Product.findByIdAndUpdate(isProduct._id,{ name, slug, price, description ,image , stock },{returnDocument:"after"});
    if (!updatedProduct) return res.status(500).json({ message: "Internal server error" });
    res.status(200).json({ message: "success", data: { updatedProduct } });
}
export const updateProductStock = async (req,res) => {
    const {id} = req.params;
    const {stock} = req.body;
    const isProduct = await Product.findById(id);
    if(!isProduct) return res.status(404).json({message:"Product is not found!!"});
    const updatedProduct = await Product.findByIdAndUpdate(isProduct._id,{ stock },{returnDocument:"after"});
    if (!updatedProduct) return res.status(500).json({ message: "Internal server error" });
    res.status(200).json({ message: "success", data: { updatedProduct } });
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "this product is not exists" });
    product.isDeleted = true;
    product.deletedAt = new Date();     
    await product.save();
    res.status(200).json({ message: "success" });
}

export const filterByCategory = async (req,res) => {
    const {categoryId} = req.params;
    const products = await Product.find({category:categoryId}).populate('category brand');
    if (products.length <= 0) return res.status(400).json({ message: "No products at this time" });
    res.status(200).json({ message: "success", data: {products} });
}

export const filterBySubCategory = async (req,res) => {
    const {subcategoryId} = req.params;
    const products = await Product.find({subCategory:subcategoryId}).populate('category brand');
    if (products.length <= 0) return res.status(400).json({ message: "No products at this time" });
    res.status(200).json({ message: "success", data: {products} });
}