import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Signup from "../Signup/Signup.js";
import {logo, flight, flightsidelogo, hotelsidelogo, mytrips, bus, support } from "../../Resources/Icons.js";
import Login from "../Login/Login.js";

export default function NavBar() {
  const [showSignup, setShowSignUp] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSignin = () => {
    if(token){
      setShowLogin(!showLogin)
    }else{
      setShowSignUp(!showSignup)
    }
  };

  const navigate = useNavigate()
  return (
    <div id="navBar-home">
       <div className="signup">{!showSignup && (<Signup token={token} setToken={setToken} showSignup = {showSignup} setShowSignUp = {setShowSignUp}/>)}</div>
      <div className="navheader-container">
        <div id="navheader" className="c">
          <div onClick={()=>navigate('/')}>
            {logo}
          </div>
            <button className={` flexXY ${token ? 'logout-button' : 'login-Btn'}`} onClick={()=>handleSignin()}>{token ? <><svg viewBox="0 0 14 14" height="16px" width="16px" className="c-inherit"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.5"></circle><path fill="currentColor" d="M3,5 C4.38071187,5 5.5,3.88071187 5.5,2.5 C5.5,1.11928813 4.38071187,0 3,0 C1.61928813,0 0.5,1.11928813 0.5,2.5 C0.5,3.88071187 1.61928813,5 3,5 Z" transform="matrix(-1 0 0 1 10 3)"></path><path fill="currentColor" d="M7,9 C9.14219539,9 10.8910789,10.6839685 10.9951047,12.8003597 L11,13 L3,13 C3,10.790861 4.790861,9 7,9 Z"></path><circle cx="7" cy="7" r="7.75" stroke="#FFF" strokeWidth="1.5"></circle></g></svg> {JSON.parse(localStorage.getItem('name'))}</> : 'Login / Signup'}</button>
          <div className='login-component'>{showLogin && <Login token={token} setToken={setToken} showLogin={showLogin} setShowLogin={setShowLogin}  showSignup = {showSignup} setShowSignUp = {setShowSignUp}/>}</div>
        </div>
      </div>
      <div className="sideNavBar-container flexXY">
      <div id="sideNavBar">
        <div id="sideNavBar-section">
          <ul id="sideNavBar-links">
            <li>
                <NavLink to="/flights">
                  <div className="flexY g10">
                  <div>{flightsidelogo}</div>
                  <h2 className="aside-links">Flights</h2>
                  </div>
                </NavLink>
            </li>
            <li>
              <NavLink to="/hotel">
              <div className="flexY g10">
                  <div>{hotelsidelogo}</div>
                  <h2 className="aside-links">Hotels</h2>
                  </div>
              </NavLink>
            </li>
            {token && <li>
              <NavLink to="/myTrips">
              <div className="flexY g10">
                  <div>{mytrips}</div>
                  <h2 className="aside-links">My Trips</h2>
                  </div>
              </NavLink>
            </li>}
            <li>
              <NavLink to="/Bus">
              <div className="flexY g10">
                  <div>{bus}</div>
                  <h2 className="aside-links">Bus</h2>
                  </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Support">
              <div className="flexY g10">
                  <div>{support}</div>
                  <h2 className="aside-links">Support</h2>
                  </div>
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
