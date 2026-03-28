import express from 'express';
import { databaseConnection } from './database/connetcion.js';

export const bootstrap = () => {

    const app = express();
    app.use(express.json());
    databaseConnection();




    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })

}