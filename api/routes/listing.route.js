import express from 'express';
import { addListing, deleteListing, getAllListings, getListing, getUserListing, offMarketListing, searchListing } from '../controllers/listing.controller.js';


const listingRouter = express.Router();

listingRouter.post('/add',addListing)
listingRouter.post('/delete',deleteListing)
listingRouter.post('/off', offMarketListing)
listingRouter.get('/getall', getAllListings)
listingRouter.post('/user', getUserListing)
listingRouter.post('/getone', getListing)
listingRouter.post('/search', searchListing)


export default listingRouter;

