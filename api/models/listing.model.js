import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    asking:{
        type:Number,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    bathrooms:{
        type: Number,
        required:true
    },
    sqft:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    market:{
        type:Boolean,
        default:true
    },
    avatar:{
        type:String,
        default:""
    }
    
});

const Listing = mongoose.model("listing",listingSchema);

export default Listing ;