const User=require('../models/User');
const jwt=require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1hr', // Token validity period
    });
};

//register user
exports.registerUser=async (req, res) => {
    const {fullName, email,password,profileImageUrl} =req.body;
    if(!fullName ||!email||!password){
        return res.status(400).json({message:"All fields required"});
    }
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
        return res.status(400).json({message:"email already in use"});
        }
        //create the user:
        const user=await User.create({
        fullName, email,password,profileImageUrl
    });
    res.status(201).json({
        id:user._id,user,token:generateToken(user._id),
    });
    }    
    catch(e){
        res.status(500)
        .json({message:"error registering user",error:e.message});
    }
};

//login user
exports.loginUser=async (req, res) => {
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({message:"All fiels are requires}"});

    }try{
        const user=await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message:"Invalid credentials"});
        }
        res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        });

    }catch(err){
         res.status(500)
        .json({message:"error registering user",error:err.message});
    }
};

//get  user info
exports.getUserInfo=async (req, res) => {
    try{
        const user=await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500)
        .json({message:"error fetching user info",error:err.message});
    }
};
