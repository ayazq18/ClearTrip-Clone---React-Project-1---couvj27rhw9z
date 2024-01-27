import React, { useEffect, useState, useRef } from "react";
import "./NavBar.css";
import { BiSolidPlaneAlt, BiSupport, BiSolidOffer } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineDirectionsBus, MdStars } from "react-icons/md";
import { TfiBag } from "react-icons/tfi";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import Signup from "../Signup/Signup.js";
import { useAuthContext } from "../ContextAllData.js";
import { trips, shortlists, travellers, wallet, hiFive, Expressway, profile, settings, cancel, change, print, voucher, logo, profileLogo } from "../Services/Icons.js";
import Login from "../Login/Login.js";

export default function NavBar() {
  const MyRef = useRef(null)
  const { all, setall } = useAuthContext();
  const [showSignup, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(()=>{
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
  }, [])

  const handleSignin = () => {
    if(token){
      setShowLogin(!showLogin)
    }else{
      setShowSignUp(!showSignup)
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
  const navigate = useNavigate()
  return (
    <div id="navBar-home">
       {showSignup && (<Signup token={token} setToken={setToken} showSignup = {showSignup} setShowSignUp = {setShowSignUp}/>)}
       {showLogin && <Login className='login-component' token={token} setToken={setToken} showLogin={showLogin} setShowLogin={setShowLogin}  showSignup = {showSignup} setShowSignUp = {setShowSignUp}/>}
      <div className="navheader-container">
      <div id="navheader">
        <div onClick={()=>navigate('/')}>
          {logo}
        </div>
          <button ref={MyRef} className="login-Btn flexXY" onClick={()=>handleSignin()}>{token ? <><svg viewBox="0 0 14 14" height="16px" width="16px" class="c-inherit"><g fill="none" fill-rule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><circle cx="7" cy="7" r="6.25" stroke="currentColor" stroke-width="1.5"></circle><path fill="currentColor" d="M3,5 C4.38071187,5 5.5,3.88071187 5.5,2.5 C5.5,1.11928813 4.38071187,0 3,0 C1.61928813,0 0.5,1.11928813 0.5,2.5 C0.5,3.88071187 1.61928813,5 3,5 Z" transform="matrix(-1 0 0 1 10 3)"></path><path fill="currentColor" d="M7,9 C9.14219539,9 10.8910789,10.6839685 10.9951047,12.8003597 L11,13 L3,13 C3,10.790861 4.790861,9 7,9 Z"></path><circle cx="7" cy="7" r="7.75" stroke="#FFF" stroke-width="1.5"></circle></g></svg> My account</> : 'Login/Signup'}</button>
      </div>
      </div>
      <div className="sideNavBar-container">
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
    </div>
  );
}
