import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header.jsx'  
import AddListing from './pages/AddListing.jsx'
import YourListings from './pages/YourListings.jsx'
import ListingInfo from './pages/ListingInfo.jsx'


export default function App() {
  return (
    <BrowserRouter>
     <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='/add-listing' element={<AddListing />} />
        <Route path='/your-listings' element={<YourListings />} />
        <Route path='/listinginfo' element={<ListingInfo />} />
      </Routes>
    </BrowserRouter>
  )
}
