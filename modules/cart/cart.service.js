import { Cart } from "../../database/model/cart.model.js";
import { Product } from "../../database/model/product.model.js";
import {User} from "../../database/model/user.model.js";

export const addToCart = async (req,res) =>{
     const { userId, productId , quantity } = req.body;
     const product = await Product.findById(productId);
     const user = await User.findById(userId);
     if(!user) return res.status(404).json({message:"User is not found!!"});
     if(!product) return res.status(404).json({message:"Product is not found!!"});
    const isCart = await Cart.findOne({user:userId});
    
    if(!isCart && product.stock >= 1){
     const cart = await Cart.create({user:userId,cartItems:[{product:productId,quantity}]});
      return res.status(201).json({message:"success",data:{cart}});
}
const existingItem = isCart.cartItems.find(item => item.product == productId);

if (existingItem && product.stock >= 1){
    existingItem.quantity += quantity;
    product.stock -= quantity;
    await product.save();
return res.status(200).json({message:"success",data:{cart:isCart}});
}
if (!existingItem && product.stock >= 1){
    isCart.cartItems.push({product:productId,quantity});
     product.stock -= quantity;
     await product.save();
return res.status(200).json({message:"success",data:{cart:isCart}});
}
if(product.stock < 1) return res.status(400).json({message:"Product is out of stock!!"});
} 

export const getCart = async (req,res) =>{
    const {userId} = req.params;
    const cart = await Cart.findOne({user:userId});
    if(!cart) return res.status(404).json({message:"Cart is not found!!"});
    res.status(200).json({message:"success",data:{cart}});
}

export const updateProductQuantity = async (req,res) =>{
    const {productId} = req.params;
    const {userId,quantity} = req.body;
    const cart = await Cart.findOne({user:userId});
    if(!cart) return res.status(404).json({message:"Cart is not found!!"});
    const product = await Product.findById(productId);
    if(!product) return res.status(404).json({message:"Product is not found!!"});
    const cartItem = cart.cartItems.find(item => item.product == productId);
    if(!cartItem) return res.status(404).json({message:"Product is not found in the cart!!"});
    if(quantity > product.stock) return res.status(400).json({message:"Quantity exceeds available stock!!"});
    cartItem.quantity = quantity;
    await cart.save();
    res.status(200).json({message:"success",data:{cart}});
}
    
export const removeFromCart = async (req,res) =>{
    const {productId} = req.params;
    const {userId} = req.body;
    const cart = await Cart.findOne({user:userId});
    if(!cart) return res.status(404).json({message:"Cart is not found!!"});
    const product = await Product.findById(productId);
    if(!product) return res.status(404).json({message:"Product is not found!!"});
    const cartItemIndex = cart.cartItems.findIndex(item => item.product == productId);
    if(cartItemIndex == -1) return res.status(404).json({message:"Product is not found in the cart!!"});
    cart.cartItems.splice(cartItemIndex,1);
    await cart.save();
    res.status(200).json({message:"success",data:{cart}});
}


export const clearCart = async (req,res) =>{
    const {userId} = req.params;
    const cart = await Cart.findOne({user:userId});
    if(!cart) return res.status(404).json({message:"Cart is not found!!"});
    cart.cartItems = [];
    await cart.save();
    res.status(200).json({message:"success",data:{cart}});
}