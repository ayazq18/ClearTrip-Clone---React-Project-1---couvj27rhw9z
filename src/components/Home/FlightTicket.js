import React from "react";
import "./FlightTicket.css";
import { CgProfile } from "react-icons/cg";
import { BiSupport, BiSolidPlaneAlt } from "react-icons/bi";
import { FaBed } from "react-icons/fa6";
import { MdKeyboardArrowUp } from "react-icons/md";


export default function FlightTicket() {
  return (
    <div className="ticket flexXY">
      <div id="ticketHeader">
        <div id="ticketSupport" className="flexBet">
          <div className="headerLogo-Icons flexY">
            <img src="./logo.png" />
            <BiSolidPlaneAlt id="takeOff" />
            <FaBed id="hotelsIcon" />
          </div>
          <div className="support-Btn flex">
            <button>INR ₹</button>
            <button>
              <BiSupport /> Support
            </button>
            <button>
              <CgProfile /> Log in
            </button>
          </div>
        </div>
        <div className="ticketForm flexEnd">
        <form className="ticketSearch-sec flexY">
            <div className="inputTicket felxXY">
              <input id="inputSource" type="text" placeholder="Where from?"/>
              <input id="inputDest" type="text" placeholder="Where to?"/>
              <input id="date" type="date" />
            </div>
            <div className="selectTicket flex">
              <select>
                <option value="Adults">Adults</option>
                <option value="Childrens">Childrens</option>
                <option value="Infants">Infants</option>
              </select>
              <button id="flightSearchBtn">Search</button>
            </div>
        </form>
        </div>
      </div>
      <div id="main" className="flex">
        <div id="aside">
          <div id="stops">
            <div className="flexBet">
              <h1>Stops</h1>
              <MdKeyboardArrowUp className="fs"/>
            </div>
            <input className="check" type="checkbox" id="non-stop"/> <label for="non-stop">Non-stop</label><br/>
            <input type="checkbox" id="1-stop"/> <label for="1-stop">1 stop</label><br/>
            <input type="checkbox" id="2-stops"/> <label for="2-stop">2 stops</label>
          </div>
          <div id="departure">
          <div id="stops">
            <div className="flexBet">
              <h1>Departure</h1>
              <MdKeyboardArrowUp className="fs"/>
            </div>
            <input className="check" type="checkbox" id="early-morning"/> <label for="early-morning">Early morning</label><br/>
            <input type="checkbox" id="morning"/> <label for="morning">Morning</label><br/>
            <input type="checkbox" id="afternoon"/> <label for="afternoon">Afternoon</label><br/>
            <input type="checkbox" id="evening"/> <label for="evening">Evening</label><br/>
            <input type="checkbox" id="night"/> <label for="night">Night</label><br/>
          </div>
          </div>
          <div id="one-way-price"></div>
          <div id="airlines"></div>

        </div>
        <div id="main-content"></div>
      </div>
    </div>
  );
}
