import React, {usestate} from 'react';
import { logo } from '../Services/Icons';
import './Booking.css'
const Booking = () => {
    return (
        <div className="BookingHeader-container">
            <div id="ticketSupport" className="flexBet">
                <div className="headerLogo-Icons flexY">
                    {logo}
                </div>
                <div className="Booking-login-Btn flex">
                    <button  className="loginBtn-one flexXY" onClick={() => handleSignin()}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Booking;
