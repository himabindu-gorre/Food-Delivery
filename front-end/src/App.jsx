import React, { useState } from 'react'
import NavBar from './components/navBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import Homes from './pages/Homes/Homes'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin , setShowLogin] = useState(false)

  return ( 
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='App'>
      <NavBar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Homes/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />      
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
