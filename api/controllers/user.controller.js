import User from "../models/user.model.js";

export const getUser =async (req,res )=>{

    //console.log("yello");
    
    const userId = req.body.userId ;

    const user = await User.findOne({_id: userId});

    if (user){
        return res.status(200).send({user: user});
    }
    else{
        return  res.status(400).send({message: "user does not exsists"});
    }
}


export const editUser = async (req, res) =>{
    var {userId,username, email} = req.body;

    try {
        await User.findOneAndUpdate({_id:userId},{username, email});
        return res.status(200).json({message: "user updated successfully"});
    }catch(error){
        return res.status(400).send({message:"error updating the user"});
    }
}

export const deleteUser = async(req,res)=>{
    const userId = req.body.userId;
    try{
        await User.findOneAndDelete({_id: userId});
        return res.status(200).json({message: "user deleted successfully"});
        }catch(error){
            return res.status(400).send({message:"error deleting the user"});
            }

}

export const updateUser =async(req,res)=>{

    //console.log(req.body);
    const{userId,username,email,name,phone,address,avatar} = req.body;

    //console.log(userId, username, email, name , phone, address, avatar);

    try{
        await User.findByIdAndUpdate({_id:userId},({username:username, email:email, name:name, phone:phone, address:address, avatar:avatar}));
        return res.status(200).json({message: "user updated successfully"});
    }catch(error){
        //console.log(error);
        return res.status(400).send({message:"error updating the user"});
    }
}