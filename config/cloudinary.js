import { v2 as cloudinary } from "cloudinary";

// console.log("Cloudinary Config - CLOUD_NAME:", process.env.CLOUD_NAME);
// console.log("Cloudinary Config - CLOUD_API_KEY:", process.env.CLOUD_API_KEY ? "***" : undefined);
// console.log("Cloudinary Config - CLOUD_API_SECRET:", process.env.CLOUD_API_SECRET ? "***" : undefined);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;

