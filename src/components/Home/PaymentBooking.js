import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import "./PaymentBooking.css"

export default function PaymentBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let FirstName = JSON.parse(searchParams.get("FirstName"));
  let Email = JSON.parse(searchParams.get("Email"));


  const [donepayment, setdonepayment] = useState(false);
  function navigatelast() {
    setTimeout(()=>{
      navigate("/");
    },3000)
  }

  return (
    <div className='paymentbooking'>
      <div className='paymentbookingMaindiv flexja'>
        {!donepayment &&
          <div className='paymentCard flexa flexc'>
            <img src='https://momentumacademy.net/wp-content/uploads/2020/05/Paymentsuccessful21.png' className='paymentimgdiv'/>
            <p>Scan QR before Pressing Done</p>
            <button className='button' onClick={() => { setdonepayment(true); navigatelast() }}>Done</button>
          </div>
        }
        {donepayment &&
          <div className='backgroundwhite flexja g20 flexc'>
            <p>{FirstName} ({Email})</p>
            <p>Your Payment is Done</p>
          </div>
        }
      </div>
    </div>
  )
}
