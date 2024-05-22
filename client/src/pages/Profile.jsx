import Cookies from 'js-cookie'
import React, { useEffect, useRef, useState } from 'react'
import {ref, uploadBytesResumable, getStorage, getDownloadURL} from 'firebase/storage'
import { app } from '../firebase';


export default function Profile() {

  const fileRef = useRef(null);

  const[file, setFile] = useState(undefined);

  const[user,setUser] = useState(null);

  const[formData, setFormData] = useState();

  const [error, setError] = useState(false);

  const [fileUploadError, setFileUploadError] = useState(false);

  const [uploadData, setUploadData] = useState();

  const[success,setSuccess] = useState(false);

  const[loading, setLoading]= useState();

  const[perc, setPerc] =useState(0);

  console.log(formData);

 
  const handleChange =(event)=>{
    setFormData({
      ...formData,
      userId:user.user._id,
      username: user.user.username,
      email: user.user.email,
      name:user.user.name,
      phone:user.user.phone,
      address:user.user.address,
      [event.target.id]: event.target.value
      });
       console.log(formData);
  }

  const submitForm = async(evt)=>{
    evt.preventDefault();
    setLoading(true);

    const res = await fetch('http://localhost:3000/api/user/updateuser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
   });

   console.log(res);

   if(res.status === 200){
      setError(false);
      setSuccess("user updated successfully!");
      setLoading(false);
   }else{
      setError("error updating the user!");
      setSuccess(false);
      setLoading(false);
   }
  }

  useEffect(() => {
    const onContentLoaded = async () => {
      const userIdCookie = Cookies.get('userId');

      //console.log(userIdCookie);

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
        setFormData({
          ...formData,
          avatar: downloadURL
        }); 
    })
  })
}
  //console.log(user.user.username);
  if (user){
    return (
      <>
      <div className='bg-gray-200  mt-8 mr-32 ml-32 pt-5 pl-5 pr-5 pb-5 shadow-sm rounded-md w-auto '>
      <h1 className='text-3xl text-center'>
        <span className='text-gray-600'> Your-</span>
        <span className='text-gray-800'>Profile</span>
      </h1>
      <div className='flex flex-col justify-center text-center'>
          <input type='file' ref={fileRef} onChange={(e)=>{setFile(e.target.files[0])}} hidden accept='image/*'></input>
          <img src={user.user.avatar} onClick={()=>{fileRef.current.click(); console.log(fileRef)}} alt ="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
          <span className='text-gray-800 mt-2 mb-4 underline font-bold'>{user ? user.user.username : 'Loading...'}</span>
      </div>
      <form onSubmit={submitForm} className='flex flex-wrap justify-center'>
        <input type='hidden' id= "userId" defaultValue={user.user._id} className='rounded p-3 border  justify-center'/>
        <p className='style2'>UserEmail</p><input type='text' defaultValue={user.user.email} id= "username" className='rounded p-3 border justify-center style1' readOnly />
        <p className='style2'>Name</p><input type='text' defaultValue={user.user.name} id= "name" className='rounded p-3 border justify-center style1'onChange={handleChange}/>
        <p className='style2'>Phone</p><input type='text' defaultValue={user.user.phone} id= "phone" className='rounded p-3 border justify-center style1'onChange={handleChange}/>
        <p className='style2'>Address</p><input type='text' defaultValue={user.user.address} id= "address" className='rounded p-3 border justify-center style1'onChange={handleChange}/>
        <div className='flex flex-col items-center gap-8'>
              <button disabled={loading} className='rounded mt-2 w-96 bg-slate-700 p-2 hover:opacity-95 disabled:opacity-70 text-white style3'  >{loading? 'Updating...':'Update'}</button>
        </div><p> </p>
        <div >
          {error && <p className='text-red-600'>{error}</p>}
          {success && <p className='text-green-600'>{success}</p>}
        </div>
      </form>
    </div>
    
    </>
    )
  }
    console.log(user);
    return (
      <div className='text-red-600' >please signin first</div>
    )

  
}
