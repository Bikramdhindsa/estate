import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";




export const signup = async(req,res,next)=>{

    
    var {username, email, password} = req.body ;
    console.log(req.body);
    password = bcryptjs.hashSync(password, 10);

    const newUser = new User({username, email, password});

    try{
        await newUser.save();
        res.status(201).json("user created successfully");
    } catch(error){
        console.log(error);
        next(error);
    }
    
}

export const signin =async (req,res,next) =>{
    const {username, password} = req.body;

    try {
        const checkUser = await User.findOne({ username: username });

        if (!checkUser) {
            return res.status(401).json("User not found");
        }

        const passwordMatch = await bcryptjs.compare(password, checkUser.password);

        if (passwordMatch) {
            //res.session.userId = checkUser._id;
            //console.log(checkUser._id);
            return res.status(200).json({message:"User logged in successfully", userId: checkUser._id});
        } else {
            return res.status(401).json("Incorrect password");
        }
    } catch (error) {
        console.log(error);
         next(error);
    }
    
}