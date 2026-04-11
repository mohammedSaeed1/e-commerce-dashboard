import { User } from "../../database/model/user.model.js";
import { uploadImageToCloudinary } from '../../utilts/cloudinary.js';


export const getUserProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "success", data: { user } });
}

export const addProfileImage = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    let avatar;
    if (req.file) {
        try {
        avatar = await uploadImageToCloudinary(req.file.buffer, "Users");            
        } catch (err) {
            return res.status(500).json({ message: "Image upload failed" });
        }
    }
   const updatedUser = await User.findByIdAndUpdate(user._id, { avatar }, { returnDocument: "after" }).select("-password");
    res.status(201).json({ message: "success", data: { updatedUser } });
}  

export const updateUserProfile = async (req, res) => { 
    const { id } = req.params;
    const { name, phone } = req.body;
    let avatar;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
      if (req.file) {
        try {
            avatar = await uploadImageToCloudinary(req.file.buffer, "Users");
        } catch (err) {
            return res.status(500).json({ message: "Image upload failed" });
        }
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, { name, avatar, phone }, { returnDocument: "after" }).select("-password");
    res.status(201).json({ message: "success", data: { updatedUser } });
 }

 export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isDeleted = true;
    user.deletedAt = new Date();
    await user.save();
    res.status(200).json({ message: "success"});
}