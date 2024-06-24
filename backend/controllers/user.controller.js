import User from "../models/users.model.js";

export const getUserForSideBar =async (req,res)=>{

    try {
        const loggedInUser=req.user._id;
        const allUsers=await User.find({_id:{$ne:loggedInUser}}).select("-password");

        res.status(200).json(allUsers);

    } catch (error) {
        console.log("Error in getUserForSideBar ",error);
        res.status(500).json({ error: error.message });
    }


}