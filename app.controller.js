import express from 'express';
import { databaseConnection } from './database/connetcion.js';
import userRouter from './modules/user/user.controller.js';
import productRouter from './modules/product/product.controller.js';
export const bootstrap = () => {

    const app = express();
    app.use(express.json());
    databaseConnection();
    app.use(`/api/v1/users`,userRouter);
    app.use(`/api/v1/products`,productRouter);




    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })

}