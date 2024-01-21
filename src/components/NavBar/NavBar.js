import React, { useEffect, useState, useRef } from "react";
import "./NavBar.css";
import { BiSolidPlaneAlt, BiSupport, BiSolidOffer } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineDirectionsBus, MdStars } from "react-icons/md";
import { TfiBag } from "react-icons/tfi";
import { NavLink, Outlet, Link } from "react-router-dom";
import Signup from "../Signup/Signup.js";
import { trips, shortlists, travellers, wallet, hiFive, Expressway, profile, settings, cancel, change, print, voucher, logo } from "../Services/Icons.js";
import Login from "../Login/Login.js";

export default function NavBar() {
  const MyRef = useRef(null)
  const [showSignup, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [token, setToken] = useState('');
  
  useEffect(()=>{
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      MyRef.current.style.backgroundColor = "transparent"
      MyRef.current.style.color = "#000"
      MyRef.current.style.boxShadow = "rgba(0, 0, 0, 0.06) 0px 6px 12px, rgba(0, 0, 0, 0.04) 0px 2px 16px"
      MyRef.current.classList.add('.logout-button')
      MyRef.current.addEventListener('mouseenter', ()=>{
      MyRef.current.style.backgroundColor = "rgba(247, 245, 245, 0.567)"
        
      })
      MyRef.current.addEventListener('mouseleave', ()=>{
      MyRef.current.style.backgroundColor = "transparent"
      })

      const icon = MyRef.current.querySelector('.fa-icon')
      if(icon){
      MyRef.current.addEventListener('mouseenter', ()=>{
        icon.style.color = "blue"
        })
      MyRef.current.addEventListener('mouseleave', ()=>{
        icon.style.color = "transparent"
        })
      }
    }
  })

  const handleSignin = () => {
    if(localStorage.getItem('token')){
      setShowLogin(!showLogin)
    }else{
      setShowSignUp(showSignup)
    }
  };

  const expandedObj = [
    {item : 'Trips', icons : trips, toolsIcon: cancel,  tools : 'Cancellations'},
    {item : 'ShortList', icons : shortlists, toolsIcon: change,  tools : 'Change flights'},
    {item : 'Travellers', icons : travellers, toolsIcon: print,  tools : 'Print tickes'},
    {item : 'Cleartrip Wallet', icons : wallet, toolsIcon: voucher,  tools : 'Print hotel voucher'},
    {item : 'Hi-Five', icons : hiFive},
    {item : 'Expressway', icons : Expressway},
    {item : 'Profile', icons : profile},
    {item : 'Settings', icons : settings},
  ]

  return (
    <div id="navBar-home">
       {/* {showSignup && (<Signup token={token} setToken={setToken} showSignup = {showSignup} setShowSignUp = {setShowSignUp}/>)}
       {showLogin && <Login/>} */}
      <div id="navheader">
      <Link href="/">
        {logo}
      </Link>
        <button ref={MyRef} className="flexXY" onClick={()=>handleSignin()}>{token !== '' ? 'My account' : 'Login/Signup'}</button>
      </div>
     
      <div id="sideNavBar">
        <div id="sideNavBar-section">
          <ul id="sideNavBar-links">
            <li>
              {/* <NavLink to='/'>  */}
                <NavLink to="/flights">
                  <BiSolidPlaneAlt/>
                  Flights
                </NavLink>
              {/* </NavLink> */}
            </li>
            <li>
              <NavLink to="/hotel">
                <HiOutlineBuildingOffice2 /> Hotels
              </NavLink>
            </li>
            <li>
              <NavLink to="/bus">
                <MdOutlineDirectionsBus /> Bus
              </NavLink>
            </li>
            <li>
              <NavLink to='/offers'>
              <BiSolidOffer /> Offers
              </NavLink>
            </li>
            <li>
            <NavLink to='/trips'>
              <TfiBag /> My trips
              </NavLink>
            </li>
            <li>
            <NavLink to='business'>
              <MdStars /> Cleartrip for Business
              </NavLink>
            </li>
            <li>
            <NavLink to='support'>
              <BiSupport /> Support
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
