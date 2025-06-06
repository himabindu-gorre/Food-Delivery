import React, { useContext, useState } from 'react'
import './navBar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/storeContext';

const NavBar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("menu");

  const { getTotalCartAmount,token, setToken} = useContext(StoreContext)

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className='navBar'>
      <Link to='/'> <img src= {assets.logo} alt="" className='logo' /> </Link> 
      <ul className="navBar-menu">
        <Link to='/' onClick={() => setMenu("home")}  className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")}  className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")}  className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
        <a href='#footer' onClick={() => setMenu("contact-us")}  className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navBar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navBar-search-icon">
          <Link to='/cart' > <img src={assets.basket_icon} alt="" /> </Link>
            <div className= { getTotalCartAmount() === 0 ? "" : "dot" }></div>
        </div>

        {!token ? (<button onClick={() => setShowLogin(true)}>Sign-In</button> ) : (

          <div className="navBar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navBar-profile-dropdown">
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt=''/><p>Orders</p></li> 
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt=''/><p>LogOut</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar


