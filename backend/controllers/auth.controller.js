import User from "../models/users.model.js";
import bcrypt from 'bcryptjs';
import generateTokenandsetCookie from "../utils/generatetokens.js";

export const signup = async (req, res) => {
  try {
    // console.log((req.body));
    const {fullName, userName, password, confirmPassword, gender } = req.body;

    
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

   const hashedPassword = await bcrypt.hash(password, 10);

    const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const profilePic = gender === 'male' ? boyAvatar : girlAvatar;

    const newUser = new User({
      fullName,
      userName,
      password:hashedPassword,
      gender,
      profilePic
    });
    generateTokenandsetCookie(newUser._id,res);
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error in signup ",error);
    res.status(500).json({ error: error.message });
  }
};

export const login =  async (req, res) => {
 try{
const {userName, password} = req.body;
 const user=await User.findOne({userName});
 const checkPass=await bcrypt.compare(password, user.password || null); 
 if(!checkPass || !user){

    return res.status(400).json({ error: "Invalid credentials" });
 }
generateTokenandsetCookie(user._id,res);
 res.status(200).json({ message: "Login successful" });

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


    }
};
