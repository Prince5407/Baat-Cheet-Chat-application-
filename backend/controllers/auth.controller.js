import User from "../models/users.model.js";
import bcrypt from 'bcryptjs';
import generateTokenandsetCookie from "../utils/generatetokens.js";

export const signup = async (req, res) => {
  try {
    // console.log((req.body));
    const {fullname, username, password, confirmPassword, gender } = req.body;

    
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

   const hashedPassword = await bcrypt.hash(password, 10);

    const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const profilePic = gender === 'male' ? boyAvatar : girlAvatar;

    const newUser = new User({
      fullname,
      username,
      password:hashedPassword,
      gender,
      profilePic
    });
    if (newUser) {
			// Generate JWT token here
			generateTokenandsetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullname: newUser.fullname,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
  } catch (error) {
    console.log("Error in signup ",error);
    res.status(500).json({ error: error.message });
  }
};

export const login =  async (req, res) => {
 try{
const {username, password} = req.body;
 const user=await User.findOne({username});
 const checkPass=await bcrypt.compare(password, user?.password || ""); 
 if(!checkPass || !user){

    return res.status(400).json({ error: "Invalid credentials" });
 }
 generateTokenandsetCookie(user._id,res);
 res.status(200).json({
  _id: user._id,
  fullname: user.fullname,
  username: user.username,
  profilePic: user.profilePic,
});

 }  
 catch(error){
    console.log("Error in login ",error);
    res.status(500).json({ error: error.message });
 }   

};

export const logout = (req, res) => {

    try{
res.cookie("jwt","",{maxage:0});
res.status(200).json({message :"Logged out successfully"})
    }
    catch(error){
      console.log("Error in logout controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });

    }
};
