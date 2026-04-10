import { User } from "../database/model/user.model.js";

export default function checkUserDeleted(req, res, next) {  
    const { id } = req.params;
    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isDeleted) {
            return res.status(400).json({ message: "User is deleted" });
        }
        next();
    });
}