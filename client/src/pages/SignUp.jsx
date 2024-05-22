import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const[loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();


  const handleChange = (evt) =>{
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value
    });
  };

  const btnOnclickSignup = async (evt) =>{
    evt.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }) ;
    const data = await res.json();

    if (data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    } else{
      setSuccess("registration successful");
    }

    setLoading(false);
    console.log(data);
  };

  
  // console.log(formData);
  return (
    <div className='bg-gray-200  mt-8 mr-32 ml-32 pt-5 pl-5 pr-5 pb-5 shadow-sm rounded-md w-auto'>
      <h1 className='text-3xl text-center'>
              <span className='text-gray-600'> Sign-</span>
              <span className='text-gray-800'>Up</span>
          </h1>
          <form onSubmit={btnOnclickSignup} className='flex flex-col items-center mt-2'>
            <input type='text' placeholder='username' id= "username" className='rounded p-3 border w-96 justify-center' onChange={handleChange}/>
            <input type='text' placeholder='email' id="email" className='rounded p-3 border mt-1 w-96 justify-center' onChange={handleChange}/>
            <input type='text' placeholder='password' id= "password" className='rounded p-3 border mt-1 w-96 justify-center' onChange={handleChange}/>

            <div className='flex flex-col items-center gap-8'>
              <button disabled={loading} className='rounded mt-2 w-96 bg-slate-700 p-2 hover:opacity-95 disabled:opacity-70 text-white' onClick={btnOnclickSignup} >{loading? 'Loading...':'Sign-Up'}</button>
            </div>
            <div className='flex items-center mt-5'>
            <p>
              Have an account?
            </p>
            <Link to={"/sign-in"}>
              <span className='text-blue-600 underline hover:opacity-75'>
                Sign-In
              </span>
            </Link>
          
            {error && <p className='text-red-600'>{error}</p>}
            {success && <p className='text-green-600'>{success}</p>}
          </div>
          </form>
          
    </div>
  )
}
