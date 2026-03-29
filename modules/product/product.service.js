import { Product } from "../../database/model/product.model.js";


// export const createProduct = async (req , res) =>{
//     const {title , description , price , category , brand } = req.body; 
// }
export const getAllProducts = async (req , res) =>{
    const products = await Product.find();
    if(products.length <= 0) return res.status(400).json({message:"No products at this time"});
    res.status(200).json({message:"success",data:products});
}