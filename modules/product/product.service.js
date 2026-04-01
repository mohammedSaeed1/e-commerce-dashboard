import { Product } from "../../database/model/product.model.js";
import { Brand } from "../../database/model/brand.model.js";
import { Category } from "../../database/model/category.model.js";
import slugify from "slugify";
import { uploadImageToCloudinary } from "../../utilts/cloudinary.js";

export const createProduct = async (req, res) => {
    const { title, description, price, category, brand } = req.body;
    let image;
    const isCategory = await Category.findById(category);
    if (!isCategory) return res.status(404).json({ message: "Category is not found!!!" });
    const isBrand = await Brand.findById(brand);
    if (!isBrand) return res.status(404).json({ message: "Brand is not found!!!" });
    const slug = slugify(title, { lower: true });
    if (req.file) {
        try {
            image = await uploadImageToCloudinary(req.file.buffer, "products");
        } catch (err) {
            return res.status(500).json({ message: "Image upload failed" });
        }
    }
    const product = await Product.create({ title, slug, price, description, category, brand, image });
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
    const { title, description, price} = req.body;
    const isProduct = await Product.findById(id);
    if(!isProduct) return res.status(404).json({message:"Product is not found!!"});
    let image , slug;
    if(title){slug = slugify(title, { lower: true });}
    if (req.file) {
        try {
            image = await uploadImageToCloudinary(req.file.buffer, "products");
        } catch (err) {
            return res.status(500).json({ message: "Image upload failed" });
        }
    }
    const updatedProduct = await Product.findByIdAndUpdate(isProduct._id,{ title, slug, price, description ,image },{returnDocument:"after"});
    if (!updatedProduct) return res.status(500).json({ message: "Internal server error" });
    res.status(200).json({ message: "success", data: { updatedProduct } });
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "this product is not exists" });
    res.status(200).json({ message: "success" });
}