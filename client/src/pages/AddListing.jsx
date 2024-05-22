import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import {ref, uploadBytesResumable, getStorage, getDownloadURL} from 'firebase/storage'
import { app } from '../firebase';

export default function AddListing() {

    const fileRef = useRef(null);

    const[file, setFile] = useState(undefined);

    const[user,setUser] = useState(null);

    const [listingData, setListingData] = useState({avatar:""});

    const [fileUploadError, setFileUploadError] = useState(false);

    const[perc, setPerc] =useState(0);

    const [errors, setErrors] = useState(false);
  
    const[successs,setSuccesss] = useState(false);
  
    const[loadings, setLoadings]= useState();

    console.log(listingData);
  
    const submitSecondForm = async (event)=>{
      event.preventDefault();
      setLoadings(true);
  
      console.log(listingData);
  
      const res = await fetch('http://localhost:3000/listing/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData)
     });
  
     console.log(res);
  
     if(res.status === 201){
        setErrors(false);
        setSuccesss("listing added successfully!");
        setLoadings(false);
     }else{
        setErrors("error adding the listing!");
        setSuccesss(false);
        setLoadings(false);
     }
  
    }
    const handleListingChange =(event)=>{
      setListingData({
        ...listingData,
        [event.target.id]: event.target.value,
        userId: user.user._id
      })
    }

    useEffect(() => {
        const onContentLoaded = async () => {
          const userIdCookie = Cookies.get('userId');
          
    
          console.log(userIdCookie);
    
          if (userIdCookie) {
            try {
              const user = await fetch('http://localhost:3000/api/user/getuser', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userIdCookie }),
              });
              const res = await user.json(); 
    
              setUser(res);
              console.log(res);
            } catch (error) {
              console.error('Error fetching user:', error);
            }
    
            return (
              <div>Profile</div>
            )
          }
        };
        onContentLoaded();
      }, []);
      useEffect(()=>{
          if(file){
            handleFileUpload(file);
          }
      },[file]);
    
      const handleFileUpload=(file)=>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage,fileName);
    
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPerc(Math.round(progress));
        },
        (error)=>{
          setFileUploadError(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setListingData({
              ...listingData,
              avatar: downloadURL
            }); 
        })
      })
      setPerc(0);
    }

      if (user){
            return (
                <div className='bg-gray-200  mt-8 mr-32 ml-32 pt-5 pl-5 pr-5 pb-5 shadow-sm rounded-md w-auto'>
                <h1 className='text-3xl text-center'>
                        <span className='text-gray-600'> Add-</span>
                        <span className='text-gray-800'>Listing</span>
                </h1>
                <div className='flex flex-col justify-center text-center'>
                  <input type='file' ref={fileRef} onChange={(e)=>{setFile(e.target.files[0])}} hidden accept='image/*'></input>
                  <img src={listingData.avatar} onClick={()=>{fileRef.current.click(); console.log(fileRef)}} alt ="uplod your image here" className='w-80 h-80 object-cover cursor-pointer self-center mt-2' />
                  <span className='text-gray-800 mt-2 mb-4 underline font-bold'>uplod your image here</span>
                </div>
                <form onSubmit={submitSecondForm} className='flex flex-wrap'>
                    <p className='style2'>Title</p><input type='text' placeholder='Title condo/house/appartment...' id= "title" className='rounded p-3 border w-96 justify-center style1' onChange={handleListingChange} />
                    <p className='style2'>Type</p><input type='text' placeholder='type of building/ commercial/peronal..' id= "type" className='rounded p-3 border w-96 justify-center style1'onChange={handleListingChange}/>
                    <p className='style2'>Address</p><input type='text' placeholder='address of building' id= "listingAddress" className='rounded p-3 border w-96 justify-center style1'onChange={handleListingChange}/>
                    <p className='style2'>Asking</p><input type='text' placeholder="asking price" id= "asking" className='rounded p-3 border w-96 justify-center style1'onChange={handleListingChange}/>
                    <p className='style2'>Bathrooms</p><input type='number' placeholder="no of bathrooms" id= "bathrooms" className='rounded p-3 border w-96 justify-center style1'onChange={handleListingChange}/>
                    <p className='style2'>Bedrooms</p><input type='number' placeholder="no of bedrooms" id= "bedrooms" className='rounded p-3 border w-96 justify-center style1'onChange={handleListingChange}/>
                    <p className='style2'>Sqft</p><input type='text' placeholder="total area in Sqft" id= "sqft" className='rounded p-3 border w-96 justify-center style1'onChange={handleListingChange}/>
                    <p className='style2'>Description</p><input type='text' placeholder="description of property" id= "description" className='rounded p-3 border w-96 justify-center style1'onChange={handleListingChange}/>
                    <p className='style2'>Contact</p><input type='text' placeholder="contact number" id= "contact" className='rounded p-3 border w-96 justify-center style1'onChange={handleListingChange}/>
                    <div className='flex flex-col items-center gap-8'>
                        <button disabled={loadings} className='rounded mt-2 w-96 bg-slate-700 p-2 hover:opacity-95 disabled:opacity-70 text-white'  >{loadings? 'adding...':'Add listing'}</button>
                    </div>
                    {errors && <p className='text-red-600'>{errors}</p>}
                    {successs && <p className='text-green-600'>{successs}</p>}
                </form>
                </div>
            )
      }else{
        return (
            <div className='bg-gray-200  mt-8 mr-32 ml-32 pt-5 pl-5 pr-5 pb-5 shadow-sm rounded-md w-auto self-center'>
                <h1 className='text-3xl text-center'>
                        <span className='text-gray-600'> Please-</span>
                        <span className='text-gray-800'>Login</span>
                </h1>

                <Link to='/sign-in'>
                <button className='rounded mt-2 w-96 bg-slate-700 p-2 hover:opacity-95 disabled:opacity-70 text-white'  >Sign-In</button>
                </Link>
            </div>
        )
      }
}
