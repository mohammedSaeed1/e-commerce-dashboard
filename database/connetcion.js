import mongoose from "mongoose";


export const databaseConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/nti-ecommerce-dashboard')
    .then(_ => {console.log("Database Connected !!!");})
    .catch(err => {console.log(err);})
}