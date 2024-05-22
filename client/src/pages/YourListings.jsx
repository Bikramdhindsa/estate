import Cookies from 'js-cookie';
import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom';
import Listing from '../components/Listing';
import FullListings from '../components/FullListings';

export default function YourListings() {
    // Access the state object passed from the previous component
    // const { state } = props.location;

    const [listings, setListings] = useState([]);
    
    useEffect(()=>{
        const onContentLoaded =async()=>{
            const userIdCookie =Cookies.get('userId');

            if (userIdCookie){
                try{
                    const listings = await fetch('http://localhost:3000/listing/user',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({userId: userIdCookie})
                    }
                    );

                    const res= await listings.json();
                    console.log(res);

                    setListings(res);
                    
                }catch(error){
                    console.log(error);
                }
            }
        }
        onContentLoaded();
    },[]);
    return (
        <>
            <h1 className='text-3xl text-center mt-5'>
                <span className='text-gray-600'> Your-</span>
                <span className='text-gray-800'>Listings</span>
            </h1>
            <div className='col-grid mt-7'>
                {listings.length > 0 ? (
                    listings.map((listing, index) => <FullListings key={index} listing={listing} />)
                ) : (
                    <p>No listings found.</p>
                )}
            </div>
        </>
    );
}