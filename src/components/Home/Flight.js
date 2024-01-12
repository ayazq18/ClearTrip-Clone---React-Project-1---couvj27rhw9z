import React, { useEffect, useReducer, useRef, useState } from "react";
import ImgCorousel from "../Corousel/FlightPage/ImgCorousel.js";
import "./Flight.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BiSolidPlaneTakeOff, BiSolidPlaneLand, BiUser } from "react-icons/bi";
import { CgArrowsExchangeAlt, CgMathMinus, CgMathPlus } from "react-icons/cg";
import { FaGreaterThan, FaLessThan, FaCircle } from "react-icons/fa6";
import { fetchFlights, fetchOffer } from "../Services/index.js";
import { MdKeyboardArrowDown, MdCompareArrows } from "react-icons/md";
import { PiCheckBold } from "react-icons/pi";
import { transform } from "typescript";
import { selectClasses } from "@mui/material";
// import { StepIcon } from "@mui/material";
// import { transform } from "typescript";




export default function Home() {
  const [offers, setOffers] = useState([]);
  const [counter, setCounter] = useState(0);
  const [imgCounter, setImgCounter] = useState(0);
  const [flight, setFlight] = useState([]);
  const [way, setWay] = useState(false);
  const [ways, setWays] = useState('One way')
  const [rotateWay, setRotateWay] = useState({transform:'rotate(0deg)'})
  const [rotateCateg, setRotateCateg] = useState({transform:'rotate(0deg)'})
  const [option, setOption] = useState('One way')
  const [icon, setIcon]= useState(<IoIosArrowRoundForward  className="way"/>)
  const [selectVisible, setSelectVisible]= useState(false)
  const [adultcount, setAdultCount] = useState(1)
  const [childrencount, setChildrenCount] = useState(0)
  const [infantcount, setinfantCount] = useState(0)
  const [classs, setClasss] = useState('Economy')
  const [fare, setFare] = useState('Regular fare')
  const [whereFrom, setWhereFrom] = useState(false)
  const [whereTo, setWhereTo] = useState(false)

  const handleClass = (category)=>{
    setClasss(category)
  }

  const handleFare = (category)=>{
    setFare(category)
  }

  const handleIncrease = (category)=>{
    switch(category){
      case 'Adults':
        setAdultCount(adultcount+1)
        break;
      case 'Children':
        setChildrenCount(childrencount+1)
        break;
      case 'Infants':
        setinfantCount(infantcount+1)
        break;
      default:
        break;
    }
  }

  const handleDecrease = (category)=>{
    switch(category){
      case 'Adults':
       adultcount>1 && setAdultCount(adultcount-1)
        break;
      case 'Children':
       childrencount > 0 && setChildrenCount(childrencount-1)
        break;
      case 'Infants':
       infantcount > 0 && setinfantCount(infantcount-1)
        break;
      default:
        break;
    }
  }

  const arr = [
    {category:'Adults', age:'(12+ Years)', count:1},
    {category:'Children', age:'(2 - 12 yrs)', count:0},
    {category:'Infants', age:'(Below 2 yrs)', count:0},
  ]

  useEffect(() => {
    // Offers
    fetchOffer()
      .then((result) => {
        setOffers(result.data.offers);
      })
      .catch((error) => {
        console.log("Error fetching offers:", error);
      });

    // Flight_Search
    fetchFlights()
      .then((result) => {
        setFlight(result.data.flights);
        console.log(result)
      })
      .catch((error) => {
        console.log("Error fetching offers:", error);
      });

    const imgInterval = setInterval(() => {
      setImgCounter((prevCounter) => (prevCounter + 1) % offers.length);
    }, 2000);

    return () => {
      clearInterval(imgInterval);
    };
  }, [offers.length, way, rotateCateg, rotateWay, option,icon]);
  // console.log("Offers:", offers);

  const handleCarouselButtonClick = (type, direction) => {
    if (type === "offer-corousel") {
      if (direction === "next") {
        setCounter((prevCounter) => (prevCounter + 1) % offers.length);
      } else if (direction === "prev") {
        setCounter(
          (prevCounter) => (prevCounter - 1 + offers.length) % offers.length
        );
      }
    } else if (type === "img-corousel") {
      if (direction === "next") {
        setImgCounter((prevCounter) => (prevCounter + 1) % offers.length);
      } else if (direction === "prev") {
        setImgCounter(
          (prevCounter) => (prevCounter - 1 + offers.length) % offers.length
        );
      }
    }
  };

  const handleTrip = ()=>{
    setWay(!way)
    setSelectVisible(false)
    setWhereFrom(false)
    setWhereTo(false)
    setRotateWay(way ? {transform:'rotate(0deg)'} : {transform:'rotate(180deg)'})
  }

  const handleSelectCategory = ()=>{
    setSelectVisible(!selectVisible)
    setWhereFrom(false)
    setWhereTo(false)
    setWay(false)
    setRotateCateg(selectVisible ? {transform:'rotate(0deg)'} : {transform:'rotate(180deg)'})
  }

  const object = [
    {url:" https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/GiftCards_RR_12072023.png", class:"Economy", fareType: 'Regular fare'},
    {url:"https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_DOTW_Varanasi_F_0501.jpg", class:"Business class", fareType: 'Student fare'},
    {url:"https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_CTTHAI_F_2012.jpg" , class:"First class", fareType: 'Senior citizen fare'},
    {url:"https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_Medicancel_F_1711.jpg", class:"Premium class", fareType: 'Armed forces fare'},
  ]

  const showWhereFrom = ()=>{
    setWhereFrom(!whereFrom);
    setWhereTo(false);
    setWay(false)
    setSelectVisible(false)
  }

  const showWhereTo = ()=>{
    setWhereFrom(false);
    setWhereTo(!whereTo);
    setWay(false)
    setSelectVisible(false)
  }

  // const searchFlight = [
  //   {short:"BLR", full:"Bangalore, IN - Kempegowda International Airport"},
  //   {short:"BOM", full:"Bangalore, IN - Kempegowda International Airport"},
  // ]
  return (
    <div className="home">
      <div className="home-main">
        <h1>Search flights</h1>
        <h2>Enjoy hassle free bookings with Cleartrip</h2>
        <form className="search-card">
          <div className="select flexBet">
            <div className="selectWay" onClick={() => handleTrip()}>
              <div className="selectTrip flexY">
                {ways === "One way" ? (
                  <IoIosArrowRoundForward className="" />
                ) : (
                  <MdCompareArrows className="" />
                )}
                <h4>{ways}</h4>
                <MdKeyboardArrowDown style={rotateWay} className="" />
              </div>
              {way && (
                <div className="search-way">
                  <div className="flexXY">
                    {ways === 'One-way' && (<PiCheckBold />)}
                    <h4 onClick={() => setWays("One way")}>One way</h4>
                  </div>
                  <div className="flexXY">
                  {ways === 'Round trip' && (<PiCheckBold />)}
                    <h4 onClick={() => setWays("Round trip")}> Round trip</h4>
                  </div>
                </div>
              )}
            </div>
            <div
              className="selectCateg flexXY"
              onClick={() => handleSelectCategory()}
            >
              <BiUser className="" />
              <h4>
                {adultcount && (
                  <>
                    {adultcount} <span>Adult, </span>
                  </>
                )}
                {childrencount > 0 && (
                  <>
                    {childrencount} <span>Childrens, </span>
                  </>
                )}
                {infantcount > 0 && (
                  <>
                    {infantcount} <span>Infants, </span>
                  </>
                )}
              </h4>
              <h4>{classs}</h4>
              <MdKeyboardArrowDown style={rotateCateg} className="" />
            </div>
          </div>
          {selectVisible && (
            <div className="selectCateg-Expand">
              {arr.map((items, index) => (
                <div className="selectCateg-Expand-container flexBet">
                  <div>
                    <h1>{items.category}</h1>
                    <h5>{items.age}</h5>
                  </div>
                  <div className="selectCateg-count flexXY">
                    <CgMathMinus
                      className="countNegIcon"
                      onClick={() => handleDecrease(items.category)}
                    />
                    <h1>
                      {items.category === "Adults"
                        ? adultcount
                        : items.category === "Children"
                        ? childrencount
                        : infantcount}
                    </h1>
                    <CgMathPlus
                      className="countPosIcon"
                      onClick={() => handleIncrease(items.category)}
                    />
                  </div>
                </div>
              ))}
              <div className="selectCateg-Expand-btns-div flexXY">
                {object.map((category, index) => (
                  <h2
                    onClick={() => handleClass(category.class)}
                    key={index}
                    className={`category ${
                      classs === category.class ? "active-classs" : ""
                    }`}
                  >
                    {category.class}
                  </h2>
                ))}
              </div>
            </div>
          )}

          <div className="btns-div flexY">
            {object.map((category, index) => (
              <h2
                onClick={() => handleFare(category.fareType)}
                key={index}
                className={`category ${
                  fare === category.fareType ? "active-fare" : ""
                }`}
              >
                {category.fareType}
              </h2>
            ))}
          </div>
          <div className="input">
            <div className="input-text">
              <BiSolidPlaneTakeOff className="whereIconfrom" />
              <CgArrowsExchangeAlt className="exchangeIcon" />
              <input id="input1" type="text" placeholder="Where from?"
                // value={flight}
                onChange={(e) => setFlight(e.target.value)}
                onClick={()=>{showWhereFrom()}}
              />
              {whereFrom && (
              <div key={flight._id} className="expand-whereFrom">
                {flight.map((flight, index)=>(
                <div className="wherefrom-container flexY">
                  <div className="short">{flight.source}</div>
                  <div className="full">{}</div>
                </div>
                ))}
                </div>   
              )}
              <BiSolidPlaneLand className="whereIconTo" />
              <input
                id="input2"
                type="text"
                placeholder="Where to?"
                // value={flight}
                onChange={(e) => setFlight(e.target.value)}
                onClick={()=>{showWhereTo()}}
              />
              {whereTo && (
              <div key={flight._id} className="expand-whereTo">
                {flight.map((flight, index)=>(
                <div className="whereTo-container flexY">
                  <div className="short">{flight.source}</div>
                  <div className="full">{}</div>
                </div>
                ))}
                </div>   
              )}
            </div>
            <div className="input-date">
              <div>
                <input id="date1" type="date" />
                <input id="date2" type="date" />
              </div>
              <div className="searchBtn">
                <button id="flightSearchBtn" onClick={() => {}}>
                  Search flights
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* offer section */}
      <div className="offer-section ">
        <ImgCorousel />
        <h1 id="more">More offers</h1>
        {offers.length && (
          <div id="offer-corousel" key={offers._id}>
            <div id="corousel-content">
              <h1>{offers[counter].pTx} offers</h1>
              <h1>{offers[counter].pTl} offers</h1>
              <a>Know more</a>
            </div>
            <div id="corousel-btn" className="flexXY">
              <div>
                <FaLessThan
                  onClick={() =>
                    handleCarouselButtonClick("offer-corousel", "prev")
                  }
                  id="prevIcon"
                />
              </div>
              <div className="btn-dots">
                {offers.map((offer, index) => (
                  <div>
                    <div
                      key={offer._id}
                      onClick={() => setCounter(index)}
                      className={`dot ${
                        offer._id === imgCounter ? "active-class" : ""
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
              <div>
                <FaGreaterThan
                  onClick={() =>
                    handleCarouselButtonClick("offer-corousel", "next")
                  }
                  id="nextIcon"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
