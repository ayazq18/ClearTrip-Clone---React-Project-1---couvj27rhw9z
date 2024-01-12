import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import './Login.css'
import LoginCorousel from '../Corousel/LoginPage/LoginCorousel.js'
export default function Login() {
    // const [imageSwap, setImageSwap] = useState()
    const [closeLogin, setCloseLogin] = useState(false)
    const closeLoginCard = ()=>{
        setCloseLogin(true)
    }
    useEffect(()=>{

    })
  return (
   
        <>
      {!closeLogin && (
            <div className="login-page flexXY">
            <div className='corousel flexXY'>
              <LoginCorousel/>
            </div>
            <div className='login-section'>
                <div>
                <RxCross1 className='close-icon' onClick={()=>closeLoginCard()}/>
                </div>
                <form className='login-form flexXY'>
                    <input type='text' placeholder='Enter Your Name'/>
                    <input type='text' placeholder='Enter Email'/>
                    <input type='text' placeholder='Enter Password'/>
                    <div className=' login-form-btn flexBet'>
                    <button>Login</button>
                    <button>Signup</button>
                    </div>
                </form>
                <p>We no more support email based login. You can now login via mobile number & link email to access your account.</p>
                <p className='footer'>By continuing, you agree to Cleartrip's <a href=''>privacy policy</a> & <a href>terms of use.</a></p>
            </div>
            </div>
        )
    }
      {!closeLogin && <div className='transparent' onClick={()=>closeLoginCard()}></div>}
    </>
  )
}
