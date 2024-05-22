import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { FaBath, FaBed, FaPhone, FaSquare } from 'react-icons/fa';

export default function ListingInfo(props) {
    const [listingId, setListingId] = useState();
    const [finalListing, setFinalListing] = useState();
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const onContentLoaded = async () => {
            setListingId(Cookies.get('listingId'));

            try {
                const listing = await fetch("http://localhost:3000/listing/getone", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: Cookies.get('listingId')}),
                });

                const res = await listing.json();
                setFinalListing(res);
                setLoading(false); // Set loading to false when data is retrieved
            } catch (error) {
                console.log(error);
            }
        };
        onContentLoaded();
    }, []);

    if (loading) {
        // Render nothing if still loading
        return null;
    }

    return (
        <div className='bg-gray-200  mt-8 mr-32 ml-32 pt-5 pl-5 pr-5 pb-5 shadow-sm rounded-md w-auto'>
            <h1 className='text-3xl text-center'></h1>
            <div className='flex'>
                <div className='rounded m-auto'>
                    <img src={finalListing?.avatar || 'placeholder-image-url'} alt="listing image" className='inline-block rounded shadow object-cover cursor-pointer mt-2' id='specialImage' />
                </div>
            </div>
            <h2 className='text-gray-700 text-center text-lg font-bold'>
                {finalListing.title}
            </h2>
            <p className='text-gray-600 text-center'>
                Type: {finalListing.type}
            </p> 
            <h2 className='text-gray-700 text-center text-lg font-bold'>
                Asking Amount: ${finalListing.asking}
            </h2>
            <div className='flex justify-center'>
            <div className=''>
                <div className='w-auto inline-block border rounded pl-3 bg-gray-100 pr-3 text-center  pt-1 pb-1 ml-1'>
                <p className='text-gray-600 flex text-center'>
                    <FaSquare className='text-gray-800 text-2xl'/>:{finalListing.sqft}Sqft
                </p>
                </div>
                <div className='w-auto inline-block border rounded pl-3 bg-gray-100 pr-3 text-center  pt-1 pb-1 ml-1'>
                    <p className='flex justify-center'>
                        <FaBed className='text-gray-800 text-2xl'/>:{finalListing.bedrooms} 
                    </p>
                 </div>
                 <div className='w-auto inline-block border rounded pl-3 bg-gray-100 pr-3 pt-1 pb-1 text-center ml-1'>
                    <p className='flex'>
                        <FaBath className='text-gray-800 text-2xl'/>:{finalListing.bathrooms}
                    </p>
                </div>
                </div>
            </div>
            <p className='text-gray-600 text-center'>
                Address: {finalListing.address}
            </p> 
            <p className='text-gray-600 text-center'>
                Description: {finalListing.description}
            </p> 
            <div className='flex justify-center'>
            <div className='w-auto inline-block border rounded pl-3 bg-gray-100 pr-3 pt-1 pb-1 text-center ml-1'>
                    <p className='flex'>
                        <FaPhone className='text-gray-800 text-2xl'/>:{finalListing.contact}
                    </p>
            </div>
            </div>

        </div>
    );
}

