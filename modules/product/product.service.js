import { Product } from "../../database/model/product.model.js";


// export const createProduct = async (req , res) =>{
//     const {title , description , price , category , brand } = req.body; 
// }

export const getAllProducts = async (req , res) =>{
    const products = await Product.find();
    if(products.length <= 0) return res.status(400).json({message:"No products at this time"});
    res.status(200).json({message:"success",data:products});
}

export const getProductById = async (req , res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product) return res.status(404).json({message:"this product is not exists"});
    res.status(200).json({message:"success",data:product});
}

export const deleteProduct = async (req , res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product) return res.status(404).json({message:"this product is not exists"});
    res.status(200).json({message:"success"});
}