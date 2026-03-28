import express from 'express';
import { databaseConnection } from './database/connetcion.js';
import userRouter from './modules/user/user.controller.js';
export const bootstrap = () => {

    const app = express();
    app.use(express.json());
    databaseConnection();
    app.use(`/api/v1/users`,userRouter);




    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })

}