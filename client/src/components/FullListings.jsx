import React, { useEffect, useState } from 'react'
import {FaBath, FaBed, FaBox, FaPhone, FaSearch, FaSquare} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function FullListings(props) {

    const [marketState, setMarketState] = useState(props.listing.market);

    const[marketStateMsg, setMarketStateMessage] = useState(false);


    useEffect(()=>{
        const onContentLoaded =async () =>{
            console.log(props);
            console.log(props.listing.address);
            
        }
        onContentLoaded();

    },[])
    const handleToggleChange = async() => {

        const newState = !marketState;

        console.log('-----------');
        console.log(newState);
        setMarketState(newState); 

        try{
            const newListing = await fetch('http://localhost:3000/listing/off',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({_id: props.listing._id, market:newState})
            }
            );

            const res= await newListing.json();

            setMarketStateMessage(res);
            
        }catch(error){
            console.log(error);
        }
        
    };

    const  btnOnClick=()=>{
        return(
            <YourListings listing={props.listing} />
        )
    }
  return (
    <div className='rounded p-1 shadow col-grid-div'>
            <div className='rounded shadow m-auto'>
                <img src={props.listing.avatar} alt ="listing image" className='inline-block rounded shadow object-cover cursor-pointer mt-2' />
            </div>
            <h2 className='text-gray-700 text-center text-lg font-bold'>
                {props.listing.title}
            </h2>
            <p className='text-gray-600 text-center'>
                Type: {props.listing.type}
            </p> 
            <h2 className='text-gray-700 text-center text-lg font-bold'>
                Asking Amount: ${props.listing.asking}
            </h2>
            <div className=''>
                <div className='w-auto inline-block border rounded pl-3 bg-gray-100 pr-3 text-center  pt-1 pb-1 ml-1'>
                <p className='text-gray-600 flex text-center'>
                    <FaSquare className='text-gray-800 text-2xl'/>:{props.listing.sqft}Sqft
                </p>
                </div>
                <div className='w-auto inline-block border rounded pl-3 bg-gray-100 pr-3 text-center  pt-1 pb-1 ml-1'>
                    <p className='flex justify-center'>
                        <FaBed className='text-gray-800 text-2xl'/>:{props.listing.bedrooms} 
                    </p>
                 </div>
                 <div className='w-auto inline-block border rounded pl-3 bg-gray-100 pr-3 pt-1 pb-1 text-center ml-1'>
                    <p className='flex'>
                        <FaBath className='text-gray-800 text-2xl'/>:{props.listing.bathrooms}
                    </p>
                </div>
            </div>
            <p className='text-gray-600 text-center'>
                Address: {props.listing.address}
            </p> 
            <p className='text-gray-600 text-center'>
                Description: {props.listing.description}
            </p> 
            <div className='w-auto inline-block border rounded pl-3 bg-gray-100 pr-3 pt-1 pb-1 text-center ml-1'>
                    <p className='flex'>
                        <FaPhone className='text-gray-800 text-2xl'/>:{props.listing.contact}
                    </p>
            </div>
            <div className='flex justify-center items-center'>
                <label htmlFor='marketToggle' className='mr-2'>
                    Market:
                </label>
                <label className='switch'>
                    <input
                        type='checkbox'
                        id='marketToggle'
                        checked={marketState}
                        onChange={handleToggleChange}
                    />
                    <span className='slider round'></span>
                </label>
            </div>
            <div>
            {marketStateMsg && <p className='text-green-600'>{marketStateMsg}</p>}
            </div>
        </div>
  )
}
