import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Tomato is a user-friendly and visually appealing food ordering platform designed to deliver a seamless dining experience online. Whether you're craving a quick bite or a full-course meal, Tomato makes it easy to explore, choose, and enjoy your favorite dishes. With a responsive layout and intuitive interface, it’s the perfect solution for modern food lovers who value convenience and quality. Future enhancements could include real-time order tracking, payment integration.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-924-4839</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Tomato.com - All Right Reversed.</p>
    </div>
  )
}

export default Footer
