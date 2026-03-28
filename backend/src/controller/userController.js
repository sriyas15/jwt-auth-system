import { asyncHandler } from "../middleware/asyncHandler.js";
import { User } from "../model/userSchema.js";
import bcrypt from "bcrypt";
import { generateTokens } from "../utils/generateTokens.js";

export const registerUser = asyncHandler(async(req,res)=>{

    const { name,email,password } = req.body

    if ( !name.trim() || !email.trim() || !password.trim() )
        return res.status(400).json({ message: "All fields required" });

    const userExist = await User.findOne({email});

    if(userExist)
        return res.status(400).json({ message: "User's email was already exists" });

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
        name,
        email,
        password:hashedPassword
    });

    const { password:removedPassword,...userData } = newUser._doc
    const accessToken = generateTokens(res, newUser._id);

    res.status(201).json({
        message: "New user created",
        accessToken,
        user: userData
    });
});

export const login = asyncHandler(async(req,res)=>{

    const { email,password } = req.body;

    if ( !email.trim() || !password.trim() )
        return res.status(400).json({ message: "All fields required" });

    const findUser = await User.findOne({email}).select("+password");

    if(!findUser)
        return res.status(400).json({message:"Invalid Credentials"});

    const matchPassword = await bcrypt.compare(password,findUser.password);

    if( !matchPassword )
        return res.status(400).json({message:"Invalid Credentials"});

    const accessToken = generateTokens(res, findUser._id);
    const { password: removedPassword, ...userData } = findUser._doc;

    res.status(200).json({
        message: "User Logged In",
        accessToken,
        user: userData
    });
});

import jwt from "jsonwebtoken";

export const refreshAccessToken = asyncHandler(async (req,res)=>{

    const refreshToken = req.cookies?.refreshToken;

    if(!refreshToken)
        return res.status(401).json({message:"No refresh token"});

    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
    );

    const accessToken = jwt.sign(
        { _id: decoded._id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
    );

    res.status(200).json({accessToken});
});

export const logout = (req,res)=>{

    res.clearCookie("refreshToken",{
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV === "production"
    });

    res.status(200).json({message:"Logged out successfully"});
}

export const getUserProfile = (req,res)=>{

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }

    return res.status(200).json({message:"USer Profile",user});
};