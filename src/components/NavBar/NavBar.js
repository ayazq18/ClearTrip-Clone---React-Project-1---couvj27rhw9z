import React, { useState } from "react";
import "./NavBar.css";
import { BiSolidPlaneAlt, BiSupport, BiSolidOffer } from "react-icons/bi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineDirectionsBus, MdStars } from "react-icons/md";
import { TfiBag } from "react-icons/tfi";
import { NavLink, Outlet } from "react-router-dom";
import Login from "../Login/Login";

export default function NavBar() {
  const [showLogin, setShowLogin] = useState(false)
  const handleSignin = ()=>{
    setShowLogin(!showLogin)
  }
  return (
    <div id="navBar-home">
      <div id="navheader">
        <img src="./logo.png" />
        <button onClick={()=>handleSignin()}>Log in / Sign up</button>
      </div>
      {showLogin === true ? <Login/> : ""}
      <div id="sideNavBar">
        <div id="sideNavBar-section">
          <ul id="sideNavBar-links">
            <li>
              <NavLink to="/">
                <NavLink to="/flight">
                  <BiSolidPlaneAlt/>
                  Flights
                </NavLink>
              </NavLink>
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
              <BiSolidOffer /> Offers
            </li>
            <li>
              <TfiBag /> My trips
            </li>
            <li>
              <MdStars /> Cleartrip for Business
            </li>
            <li>
              <BiSupport /> Support
            </li>
          </ul>
          {/* <div id="container"><Home/></div> */}
          {/* <div id="offer"></div> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
