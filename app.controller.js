import express from 'express';
import { databaseConnection } from './database/connetcion.js';
import userRouter from './modules/user/user.controller.js';
import productRouter from './modules/product/product.controller.js';
import categoryRouter from './modules/category/category.controller.js';
import brandRouter from './modules/brand/brand.controller.js';

export const bootstrap = () => {

    const app = express();
    app.use(express.json());
    databaseConnection();
    app.use(`/api/v1/users`,userRouter);
    app.use(`/api/v1/products`,productRouter);
    app.use(`/api/v1/categories`,categoryRouter);
    app.use(`/api/v1/brands`,brandRouter);



    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })

}