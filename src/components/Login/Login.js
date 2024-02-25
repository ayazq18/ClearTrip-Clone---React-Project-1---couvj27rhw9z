import React, { useRef } from "react";
import './Login.css'
import { expandedObj } from "../Constants.js";
import { useNavigate } from "react-router-dom";

export default function Login({token,setToken, showLogin, setShowLogin, setShowSignUp, showSignUp}) {
    const MyRef = useRef(null);
    const navigate = useNavigate()
      const handleSignOut = ()=>{
        if(token){
          setToken('')
          localStorage.removeItem('token')
          localStorage.removeItem('name')
        }
      }

      const handletopage = ()=>{
        navigate('/ComingSoon')
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
                    <div key={index} onClick={()=>handletopage()} className="account-items-one flexY">
                    {Obj.icons}
                    <h4 key={index}>{Obj.item}</h4>
                    </div>
                ))}
                </div>
                <div className="logout-tools-sec-one">
                <h6>Quick tools</h6>
                {expandedObj.map((Obj, index)=>(
                    <div onClick={()=>handletopage()} className="tools-items-one flexY">
                    {Obj.toolsIcon}
                    <h4 key={index}>{Obj.tools}</h4>
                    </div>
                ))}
                </div>
            </div>
            <div className="expande-signout-one"><h4 ref={MyRef} onClick={()=>{handleSignOut()}}>Logout</h4></div>
            </div>
        </div>
        <div className="signUpPage flexXY">
      </div>
    </div>
  )
}
