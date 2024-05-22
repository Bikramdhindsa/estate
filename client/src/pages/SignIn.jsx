import React, { useState } from 'react';
import { Link} from 'react-router-dom';
// import {Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function SignIn() {

  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleOnChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value
    });
  };

  const btnOnClickSignIn = async (evt) => {
    evt.preventDefault();

    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.message === "User logged in successfully") {
      setError(false);
      setSuccess(data.message);
      const userId = data.userId;
      Cookies.set('userId', userId);

      // Navigate('/');
      // return <Navigate to="/" />;
    } else {
      setSuccess(false);
      setError("Please enter the correct credentials");
    }
  };

  return (
    <div className='bg-gray-200 mt-8 mr-32 ml-32 pt-5 pl-5 pr-5 pb-5 shadow-sm rounded-md w-auto'>
      <h1 className='text-3xl text-center'>
        <span className='text-gray-600'> Sign-</span>
        <span className='text-gray-800'>In</span>
      </h1>
      <form onSubmit={btnOnClickSignIn} className='flex flex-col items-center mt-2'>
        <input type='text' placeholder='username' id="username" onChange={handleOnChange} className='rounded p-3 border w-96 justify-center' />
        <input type='text' placeholder='password' id="password" onChange={handleOnChange} className='rounded p-3 border mt-1 w-96 justify-center' />

        <div className='flex items-center gap-8'>
          <button className='rounded mt-2 w-96 bg-slate-700 p-2 hover:opacity-95 disabled:opacity-70 text-white'>Sign-In</button>
        </div>

        <div className='flex items-center mt-5'>
          <p>
            Don't have an account?
          </p>
          <Link to={"/sign-up"}>
            <span className='text-blue-600 underline hover:opacity-75'>
              Sign-Up
            </span>
          </Link>

        </div>
      </form>
      {error && <p className='text-red-600'>{error}</p>}
      {success && <p className='text-green-600'>{success}</p>}
    </div>
  );
}
