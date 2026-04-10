import { User } from "../../database/model/user.model.js";

export const getUserProfile = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id).select("-password");
    if(!user)return res.status(404).json({message:"User not found"});
    res.status(200).json({message:"success", data:{user}});
}
