import { get } from 'mongoose'
import React, { useEffect, useState } from 'react'
//import Listing from '../components/Listing';
 import Listing from '../components/Listing.jsx'

export default function Home() {

  const [listing,setListing] = useState([]);

  useEffect(()=>{
    const onContentLoaded = async() =>{
      const listings = await fetch('http://localhost:3000/listing/getall',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          }
      });
      const listingsJson = await listings.json();
      //console.log(listingsJson);

      setListing(listingsJson);

  

    };
    onContentLoaded();
  },[])

  return (
    <>
        <h1 className='text-3xl text-center mt-5'>
        <span className='text-gray-600'> Welcome to Real</span>
        <span className='text-gray-800'>Estate</span>
        <span className='text-gray-600'> Website </span>
      </h1>
    <div className='col-grid mt-5'>
      {listing.map((listing, index) => (
        <Listing key={index} listing={listing} />
      ))}
    </div>
    </>
  )
}
