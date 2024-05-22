import Listing from "../models/listing.model.js";

export const addListing = async(req,res)=>{
    const {title, type, listingAddress, asking, bedrooms,bathrooms,sqft,description,contact,userId,avatar} = req.body;

    //console.log(req.body);

    //console.log(title, type, listingAddress, asking, bedrooms,bathrooms,sqft,description,contact,userId,avatar);

    const market = true;

    const listing = new Listing({title, type, address: listingAddress, asking, bedrooms,bathrooms,sqft,description,contact,user:userId, market, avatar:avatar});

    try{
        await listing.save();
        res.status(201).json("listing is added");
    }catch(error){
        res.status(400).json({message: error.message});
    }

}

export const deleteListing = async(req,res)=>{
    const {_id} = req.body;

    try{
        await Listing.findByIdAndDelete(_id);
        res.status(201).json("listing is deleted");
    }catch(erorr){
        res.status(400).json({message: error.message});
    }

}

export const offMarketListing = async(req,res)=>{

    const {_id, market} = req.body;
    // const market = false;
    try{
        await Listing.findByIdAndUpdate(_id, {market});
        var marketVal = "";
        if(market){
            marketVal = "listing is active"
            }else{
                marketVal = "listing is off market"
                }
        res.status(201).json(marketVal);
        }catch(error){
            res.status(400).json({message: error.message});
            }
}

export const getAllListings = async(req,res)=>{
    try{
        const listings = await Listing.find({market:true});
        console.log(listings);
        res.status(200).json(listings);
    }catch(erorr){
        res.status(400).json({message: error.message});
    }
}

export const getUserListing = async (req,res)=>{
    //console.log(req);
    try{
        //console.log(req.body.userId);

        const listings = await Listing.find({user: req.body.userId});

        //console.log(listings);
        res.status(200).json(listings);
    }catch(error){
        res.status(400).json({message: error.message}); 
    }
}

export const getListing = async (req,res)=>{
    //console.log(req);
    try{
        console.log(req.body);

        const listings = await Listing.findOne({_id: req.body._id});

        console.log(listings);
        res.status(200).json(listings);
    }catch(error){
        res.status(400).json({message: error.message}); 
    }
}

export const searchListing = async (req, res) => {
    try {
        const searchWord = req.body.word;
        console.log(searchWord);
        // const regex = new RegExp(searchWord, 'i');
    
        // const fields = Object.keys(Listing.schema.paths);
        // const orArray = fields.map(field => ({ [field]: { $regex: regex } }));
        const listings = await Listing.find({ $text: { $search: "ad" } } );

        res.status(200).json(listings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}