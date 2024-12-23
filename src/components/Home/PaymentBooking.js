import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { logo } from '../../Resources/Icons';
import { useAuthContext } from '../ContextAllData';


export default function HotelPayment() {
  const location = useLocation()
  const { flightpaymnentdone, setflightpaymentdone} = useAuthContext()
  const searchParams = new URLSearchParams(location.search)
  let totalAmount = searchParams.get('Amount')
  let fName = searchParams.get('FirstName')
  let email = searchParams.get('Email')

  const navigate = useNavigate()
  const [popp, setPopp] = useState({ 'UPI': true, 'DEBIT':false })
  const [payment, setPayment] = useState(false)
  const [details, setdetails] = useState({ cardnumber: "", name: "", CVV: "", UPI: "", ischecked: false})


  const object = [
    { month: 'Jan (01)' }, { month: 'Feb (02)' }, { month: 'Mar (03)' }, { month: 'April (04)' }, { month: 'May (05)' }, { month: 'Jan (06)' }, { month: 'Juk (07)' }, { month: 'Aug (08)' }, { month: 'Sep (09)' }, { month: 'Oct (10)' }, { month: 'Nov (11)' }, { month: 'Dec (12)' }
  ]
  const yearsArray = Array.from({ length: 26 }, (_, index) => 2024 + index);

  const pop = (key) => {
    setPopp((prev)=>({[prev]:false}))
    setPopp((prev) => ({ ...prev, [key]: true }))
  }

  const clicktopay = () => {
    // if(details.name && details.cardnumber.length===16 && details.CVV.length===3 && details.ischecked){
      setPayment(!payment)
      setTimeout(() => {
        setPayment(false)
        setflightpaymentdone(false)
        navigate('/')
      }, 10000);
    // }
    // else{
    //   if(details.cardnumber.length<16){
    //     alert("Enter the correct card number")
    //     }else if(details.CVV.length<3){
    //       alert("Enter the correct CVV")
    //     }else if(details.name === '' ){
    //       alert("Enter the correct Name")
    //     }else if(!details.ischecked){
    //       alert("Please accept the terms")
    //     }
    // }
  }

  const clicktopayUpi = () => {
    // if (details.UPI && details.ischecked && details.UPI.includes('@')) {
      setPayment(!payment)
      setTimeout(() => {
        setPayment(false)
        setflightpaymentdone(false)
        navigate('/')
      }, 5000);
    // } else if(details.UPI === '' || !details.UPI.includes('@')){
    //   alert ("Please enter the correct UPI")
    // }
    // else if (!details.ischecked) {
    //   alert("Please accept the terms")
    // }
  }

  function travellerinfo(key, value) {
    setdetails((prev) => ({ ...prev, [key]: value }));
}

useEffect(()=>{
  if(flightpaymnentdone === false){
    navigate('/')
  }
},[])

  return (
    <div className='hotelBooking'>
      {payment && <div className='payment-transparent'></div>}
      <div className="wholenav flexja">
        <nav className=' flexa'>
          <NavLink to='/'>
            <svg width="107" height="24" viewBox="0 0 310 65" fill="none" color="#214497" className="mr-7"><path d="M249.469 16.3906C243.189 16.3906 240.039 19.1706 240.039 25.4606V49.1506H247.469V25.8206C247.469 23.7506 248.399 22.7506 250.539 22.7506H257.039V16.3906H249.469V16.3906Z" fill="#FF4F17"></path><path d="M264.891 1.59961C262.461 1.59961 260.461 3.59961 260.461 6.09961C260.461 8.59961 262.461 10.5296 264.891 10.5296C267.321 10.5296 269.391 8.52961 269.391 6.09961C269.391 3.66961 267.391 1.59961 264.891 1.59961Z" fill="#FF4F17"></path><path d="M268.61 16.2402H261.25V49.0902H268.61V16.2402Z" fill="#FF4F17"></path><path d="M121.289 42.8804C119.149 42.8804 118.219 42.3104 118.219 40.1704V1.65039H110.789V40.1704C110.789 46.6704 114.429 49.2404 120.139 49.2404H124.069V42.8804H121.289V42.8804Z" fill="#FF4F17"></path><path d="M209.119 16.2695C202.839 16.2695 199.689 19.0495 199.689 25.3395V49.1195H207.119V25.6995C207.119 23.6295 208.049 22.6295 210.189 22.6295H216.689V16.2695H209.119Z" fill="#FF4F17"></path><path d="M228.33 16.2998V8.08984H220.9V40.0798C220.9 46.2898 224.11 49.1498 230.33 49.1498H235.9V42.7898H231.4C229.4 42.7898 228.33 42.0798 228.33 40.0798V22.6598H235.9V16.2998H228.33V16.2998Z" fill="#FF4F17"></path><path d="M274.82 16.5006V63.3706H282.25V46.3006C284.91 48.1406 288.13 49.2306 291.6 49.2306C300.67 49.2306 308.02 41.8806 308.02 32.8106C308.02 23.7406 300.67 16.3906 291.6 16.3906C288.12 16.3906 284.9 17.4806 282.25 19.3206V16.5006H274.82V16.5006ZM282.25 32.8106C282.25 27.6406 286.44 23.4606 291.6 23.4606C296.76 23.4606 300.95 27.6506 300.95 32.8106C300.95 37.9706 296.76 42.1606 291.6 42.1606C286.44 42.1606 282.25 37.9706 282.25 32.8106V32.8106Z" fill="#FF4F17"></path><path d="M156.92 32.1006C156.92 22.1006 150.21 16.3906 141.42 16.3906C131.57 16.3906 125.5 23.2506 125.5 32.7406C125.5 42.2306 132.21 49.2406 141.57 49.2406C149.85 49.2406 154.21 45.5306 156.28 39.3906H148.28C147.07 41.7506 144.78 42.8206 141.42 42.8206C136.99 42.8206 133.35 40.0406 133.07 35.0406H156.78C156.92 33.4706 156.92 32.7506 156.92 32.1106V32.1006ZM133.14 29.7406C133.78 25.3806 136.85 22.7406 141.64 22.7406C146.43 22.7406 149.07 25.2406 149.49 29.7406H133.14Z" fill="#FF4F17"></path><path d="M98.8005 37.9506C97.5905 41.3806 95.3005 42.8106 91.8705 42.8106C86.2305 42.8106 83.8005 38.3806 83.8005 32.7406C83.8005 27.1006 86.5805 22.7406 92.0105 22.7406C95.4405 22.7406 97.7205 24.5306 98.7905 27.6006H106.72C104.86 20.1006 99.2905 16.3906 91.8705 16.3906C81.8705 16.3906 76.2305 23.5306 76.2305 32.7406C76.2305 42.7406 82.8705 49.2406 91.8705 49.2406C100.87 49.2406 105.22 44.1706 106.72 37.9606H98.7905L98.8005 37.9506Z" fill="#FF4F17"></path><path d="M56.6095 17.7393C44.1095 26.8793 33.3295 38.8793 23.6895 48.9493C22.9795 49.6593 22.0495 50.1593 21.0495 50.1593C19.8395 50.1593 18.9095 49.4493 18.0495 48.1593C15.5495 44.4493 11.7695 35.4493 10.0495 31.5193C8.68954 28.3093 9.40954 25.6593 12.6195 24.3093C15.8295 23.0193 19.3995 22.8093 20.2595 26.4493C20.2595 26.4493 21.8995 32.8093 22.3995 34.6593C32.3295 25.4493 44.5395 15.6693 54.8895 9.66929C52.3195 4.80929 47.2495 1.5293 41.4695 1.5293H16.9795C8.54954 1.5293 1.76953 8.30929 1.76953 16.6693V41.2293C1.76953 49.5793 8.54954 56.3693 16.9795 56.3693H41.4695C49.8195 56.3693 56.6095 49.5893 56.6095 41.2293V17.7393V17.7393Z" fill="#FF4F17"></path><path d="M186.059 16.5006V19.3206C183.399 17.4806 180.179 16.3906 176.709 16.3906C167.639 16.3906 160.289 23.7406 160.289 32.8106C160.289 41.8806 167.639 49.2306 176.709 49.2306C180.189 49.2306 183.409 48.1406 186.059 46.3006V49.0906H193.489V16.5006H186.059ZM176.709 42.1606C171.539 42.1606 167.359 37.9706 167.359 32.8106C167.359 27.6506 171.549 23.4606 176.709 23.4606C181.869 23.4606 186.059 27.6506 186.059 32.8106C186.059 37.9706 181.869 42.1606 176.709 42.1606Z" fill="#FF4F17"></path></svg>
          </NavLink>
        </nav>
      </div>
      <div className='hotelPayment flexXY flexc g20'>
        <h1>Pay to complete your booking</h1>
        <h5 style={{backgroundColor:'yellow', color:'red', padding:'5px', width:'500px', textAlign:'center'}}>This Form is disabled because of the warning has been reported for phishing by the vercel team, SO YOU CAN SUBMIT WITHOUT FILLING THE DETAILS </h5>
        <div className='hotelPayment-main flex'>
          {payment &&
            <div className='paymentPopup'>
              <div className='flexc g20'>
                <div className='flexBet'>{logo}</div>
                <h2 style={{color:'green', textAlign:'center'}}>Payment Successful</h2>
                <h2 style={{textAlign:'center'}}>Dear {fName}</h2>
                <p style={{textAlign:'center'}}>Have a good journey 🙂</p>
              </div>
              <div style={{marginTop:'50px', textAlign:'center', borderTop:'1px dashed #808080', paddingTop:'10px'}}>The booking details is been sent to {email}</div>
            </div>
          }
          <div className='hotelPayment-Upi flex'>
            <div className='hotelPayment-Upi-options'>
              <div className={`hotelPayment-Upi-option1 c flexBet ${popp['UPI'] ? 'payment-active' : ''}`} onClick={() => {pop('UPI')}}><h4>UPI</h4>{popp['UPI'] && <IoIosArrowForward />}</div>
              <div className={`hotelPayment-Upi-option2 c flexBet ${popp['DEBIT'] ? 'payment-active' : ''}`} onClick={() =>{ pop('DEBIT')}}><h4>Debit/Credit card</h4>{popp['DEBIT'] && <IoIosArrowForward />}</div>
            </div>
            {popp['DEBIT'] && <div className='hotelPayment-debit-option1-form'>
              <div className='hotelCard'><h3>Enter Card details</h3><div className='flexXY'></div></div>
              <form className='hotelDebitform flex'>
                <label>Card Number</label>
                <input disabled type='number' value={details.cardnumber} minLength={16} maxLength={16} onInput={(e)=>{if (e.target.value.length > 16) {e.target.value = e.target.value.slice(0, 16)}}} onChange={(e)=>travellerinfo('cardnumber', `${e.target.value}`)} placeholder='Enter card number' />
                <label>Expiry date</label>
                <div className=' g20'>
                    <select>{object.map(item=>(<option value={item.month}>{item.month}</option>))}</select>
                    <select>{yearsArray.map((item, index) => (<option key={index}>{item}</option>))}</select>
                </div>
                <label>Cardholder name</label>
                <input disabled type='text' value={details.name} onChange={(e)=>travellerinfo('name', `${e.target.value}`)} placeholder='Name as on card' />
                <label>CVV</label>
                <input disabled className='CVV' type='number' minLength={3} maxLength={4} value={details.CVV} onInput={(e)=>{if (e.target.value.length > 4) {e.target.value = e.target.value.slice(0, 4)}}}  onChange={(e)=>travellerinfo('CVV', `${e.target.value}`)} placeholder='CVV' />
              </form>
            </div>}

            {popp['UPI'] &&
              <>
                <div className='hotelPayment-Upi-option1-form flexc'>
                  <h3>Enter UPI ID</h3>
                  <form className='hotelUPIform'>
                    <input disabled type='text' value={details.UPI} onChange={(e)=>travellerinfo('UPI', `${e.target.value}`)} placeholder='Enter your UPI ID' />
                  </form>
                  <p>Payment request will be sent to the phone no. linked to your UPI ID</p>
                </div>

                <div className='hotelPayment-QR'>
                  <h1>SCAN QR CODE</h1>
                  <div className='showqrcode flexc'>
                    <div></div>
                    <img className='upiicon' src='https://cdn.icon-icons.com/icons2/2699/PNG/512/upi_logo_icon_169316.png' />
                    <img className='upiscanner' src='https://www.freepnglogos.com/uploads/qr-code-png/qr-code-file-wikipedia-code-svg-1.png' />
                    <div><img src='' /></div>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
        <div className='termsandsubmission flexXY'>
          <div className='termssubmit flexBet g10'>
            <div>
              <div className='flexY g10'><input type='checkbox' className='styled-checkbox' value={details.ischecked} onClick={()=>travellerinfo('ischecked', !details.ischecked)} /><label>I understand and agree to the rules and restrictions of this fare, the booking policy, the privacy policy and the terms and conditions of Cleartrip and confirm address details entered are correct</label></div>
            </div>
            <div className='paysubmit flexc'><h1>₹{totalAmount}</h1><p>Total, inclusive of all taxes</p></div>
            {popp['DEBIT'] && <button onClick={() => clicktopay()}>Pay now</button>}
            {popp['UPI'] && <button onClick={() => clicktopayUpi()}>Pay now</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
