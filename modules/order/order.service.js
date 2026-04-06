import { Order } from "../../database/model/order.model.js";

export const createOrder = async (req,res) =>{
    const { userId, cartItems, totalAmount, paymentMethod , paymentStatus , orderStatus } = req.body;
    const order = (await Order.create({ user: userId, items: cartItems, totalAmount, paymentMethod , paymentStatus , orderStatus }));
    if (!order) return res.status(500).json({ message: "Internal server error" });
    res.status(201).json({ message: "success", data: { order } });
}

export const getOrdersByUserId = async (req,res) =>{
    const { userId } = req.body;
    const orders = await Order.find({ user: userId });
    if (orders.length <= 0) return res.status(404).json({ message: "No orders found for this user" });
    res.status(200).json({ message: "success", data: { orders } });
}

export const getSpecificOrder = async (req,res) =>{
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order is not found!!" });
    res.status(200).json({ message: "success", data: { order } });
}

export const getAllOrders = async (req,res) =>{
    const orders = await Order.find();
    if (orders.length <= 0) return res.status(404).json({ message: "No orders at this time" });
    res.status(200).json({ message: "success", data: { orders } });
}

export const updateOrderStatus = async (req,res) =>{
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order is not found!!" });
    order.orderStatus = orderStatus;
    await order.save();
    res.status(200).json({ message: "success", data: { order } });
}