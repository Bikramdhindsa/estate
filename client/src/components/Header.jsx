import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const [cookie,setCookie] = useState(false);

  const [searchData, setSearchData] = useState();

  const searchFormData =(evt)=>{
    setSearchData({
      ...searchData,
      [evt.target.id]: evt.target.value
    })
    console.log(searchData);
  }

  const onClickSearch= async (evt)=>{
    evt.preventDefault();
    const response = await fetch('http://localhost:3000/lisitng/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({word: searchData.word})
        });
        const data = await response.json();
        console.log(data);
  }
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(()=>{
    const onContentLoaded = async () => {
      setCookie(Cookies.get('userId'));
    };
    onContentLoaded();

  })

  return (
    <header className='bg-gray-700 shadow-md '>  
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='text-sm text-xl flex flex-wrap'>
              <span className='text-gray-400'> Real </span>
              <span className='text-white'> estate</span>
          </h1>
          </Link>
          <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' id="word" placeholder='search ......' className='bg-transparent focus:outline-none w-24 sm:w-64' onChange={searchFormData}></input>
            <FaSearch className='text-slate-600' onClick={onClickSearch}/>
          </form>
          <ul className='flex gap-4'>
            <Link to='/'>
              <li className='hidden sm:inline text-gray-400 hover:underline hover:text-white'>Home</li>
            </Link>
            <Link to='/about'>
              <li className='hidden sm:inline text-gray-400 hover:underline  hover:text-white'>About</li>
            </Link>
            {cookie ?(<li
            className='inline text-gray-400 hover:underline hover:text-white cursor-pointer relative'
            onClick={toggleDropdown}>
            Profile
            {showDropdown && (
              <ul className='absolute bg-gray-700 mt-1 p-2 rounded-md shadow-lg w-40'>
                <li>
                  <Link
                    to='/profile'
                    className='text-gray-300 hover:text-white '
                    onClick={() => setShowDropdown(false)}>
                    Your Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to='/add-listing'
                    className='text-gray-300 hover:text-white'
                    onClick={() => setShowDropdown(false)}>
                    Add Listing
                  </Link>
                </li>
                <li>
                  <Link
                    to='/your-listings'
                    className='text-gray-300 hover:text-white'
                    onClick={() => setShowDropdown(false)}>
                    Your Listings
                  </Link>
                </li>
                <li>
                  <Link
                    to='/'
                    className='text-gray-300 hover:text-white'
                    onClick={() => {setShowDropdown(false); Cookies.remove('userId');}}>
                    Log-Out
                  </Link>
                </li>
                </ul>
                )}
                </li>):(<Link to='/sign-in'>
              <li className='hidden sm:inline text-gray-400 hover:underline hover:text-white' >SignIn</li>
            </Link>) }
          </ul>
        </div>
   </header>
  )
            }
