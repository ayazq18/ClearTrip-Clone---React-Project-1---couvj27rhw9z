import React, { useEffect, useState, useRef } from "react";
import './Login.css'
import { trips, shortlists, travellers, wallet, hiFive, Expressway, profile, settings, cancel, change, print, voucher } from "../../Services/Icons.js";

export default function Login({token,setToken, showLogin, setShowLogin, pop}) {
    const MyRef = useRef(null);
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

      const handleSignOut = ()=>{
        if(token){
          setToken('')
          localStorage.removeItem('token')
          setShowLogin(!showLogin)
          MyRef.current.style.backgroundColor = "blue"
          MyRef.current.style.color = "#fff"
        }
      }

  return (
    <div>
        <div className="navheader-one">
            <div onClick={()=>{setShowLogin(false)}} className="Expand-to-logout-one flexXY">
            <div className="logout-profile-one"><h2>My Account</h2></div>
            <div className="logout-account-one flex">
                <div className="logout-account-sec">
                <h6>Account</h6>
                {expandedObj.map((Obj, index)=>(
                    <div className="account-items-one flexY">
                    {Obj.icons}
                    <h4 key={index}>{Obj.item}</h4>
                    </div>
                ))}
                </div>
                <div className="logout-tools-sec-one">
                <h6>Quick tools</h6>
                {expandedObj.map((Obj, index)=>(
                    <div className="tools-items-one flexY">
                    {Obj.toolsIcon}
                    <h4 key={index}>{Obj.tools}</h4>
                    </div>
                ))}
                </div>
            </div>
            <div className="expande-signout-one"><h4 ref={MyRef} onClick={()=>{handleSignOut()}}>Sign out</h4></div>
            </div>
        </div>
        <div className="signUpPage flexXY">
      </div>
    </div>
  )
}
