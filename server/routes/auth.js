import express from "express";
import User from "../models/User.js";
const router = express.Router();
import generateToken from "../utils/generateToken.js";
import userVerification from "../middleware/authMiddleware.js";

router.post("/register", async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ message: "user already exists" });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    const token = generateToken(newUser._id);
    res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
      //  sameSite: "None",
       maxAge: 86400 * 1000, 
    });
    res.status(200).json({ message: "User signed in successfully", success: true, newUser });
    next();
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error});
  }
});

router.post("/login", async (req, res, next) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user){
    return res.status(201).json({message:'invalid credential'});
    }
    const ismatch = password === user.password;
    if(!ismatch){
    return res.status(202).json({message:'invalid credential'});
    }
    const token = generateToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
      //  sameSite: "None",
       maxAge: 86400 * 1000, 
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next();
  } catch(error){
    res.status(500).json({message:'Error Logging in', error});
  }
});

router.post('/', userVerification);

export default router;
