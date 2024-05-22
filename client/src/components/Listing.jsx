import React, { useEffect } from 'react'
import {FaBath, FaBed, FaBox, FaPhone, FaSearch, FaSquare} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import YourListings from '../pages/YourListings'
import Cookies from 'js-cookie'


export default function Listing(props) {
    useEffect(()=>{
        const onContentLoaded =async () =>{
            console.log(props);
            console.log(props.listing.address);
            
        }
        onContentLoaded();

    },[])

    const  btnOnClick=()=>{
        const listingIdCookieExists = Cookies.get('listingId') !== undefined;
            if (listingIdCookieExists) {
                Cookies.remove('listingId');
                Cookies.set('listingId', props.listing._id);
            } else {
                Cookies.set('listingId', props.listing._id);
            }
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
            <div className='w-auto inline-block border rounded pl-3 bg-gray-100 pr-3 pt-1 pb-1 text-center ml-1 mt-1'>
                    <p className='flex'>
                        <FaPhone className='text-gray-800 text-2xl'/>:{props.listing.contact}
                    </p>
                </div>
            <p className='text-gray-600 text-center'>
                Address: {props.listing.address}
            </p> 
            

            
            <div className='items-center gap-8'>

            <Link to={{
                    pathname: '/listinginfo',
                    state:{listing: 'hello'}
                }}>
                    <button className='rounded mt-2 bg-slate-700 p-2 hover:opacity-95 disabled:opacity-70 text-white btn-class' onClick={btnOnClick}>
                        More
                    </button>
                </Link>

                  {/* <button className='rounded mt-2 bg-slate-700 p-2 hover:opacity-95 disabled:opacity-70 text-white btn-class' onClick={btnOnClick} >More</button> */}
            </div>
        </div>
      )
  
}
