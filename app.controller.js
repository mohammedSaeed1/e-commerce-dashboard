import express from 'express';
import { databaseConnection } from './database/connetcion.js';
import authRouter from './modules/auth/auth.controller.js';
import productRouter from './modules/product/product.controller.js';
import categoryRouter from './modules/category/category.controller.js';
import brandRouter from './modules/brand/brand.controller.js';
import userRouter from './modules/user/user.controller.js';
import cartRouter from './modules/cart/cart.controller.js';
import orderRouter from './modules/order/order.controller.js';
import staffRouter from './modules/staff/staff.controller.js';

export const bootstrap = () => {

    const app = express();
    app.use(express.json());
    databaseConnection();
    app.use(`/api/v1/auth`,authRouter);
    app.use(`/api/v1/products`,productRouter);
    app.use(`/api/v1/categories`,categoryRouter);
    app.use(`/api/v1/brands`,brandRouter);
    app.use(`/api/v1/users`,userRouter);
    app.use(`/api/v1/cart`,cartRouter);
    app.use(`/api/v1`,orderRouter);
    app.use(`/api/v1`,staffRouter);


    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })

}