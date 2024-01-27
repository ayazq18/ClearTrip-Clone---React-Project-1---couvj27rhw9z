import React, { useEffect, useState, useContext, useRef, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowRoundUp } from "react-icons/io";
import "./FlightTicket.css";
import { MdKeyboardArrowUp } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { logo, flightgo, hotelIcon, support, sortIcon, } from "../Services/Icons";
import Login from "../Login/Login";
import Signup from "../Signup/Signup.js";
import { Base_URL, Project_ID, App_Type } from "../Constants";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuthContext } from "../ContextAllData.js";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function FlightTicket() {
    const { all, setall } = useAuthContext();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let flightFrom = searchParams.get("source");
    let flightToo = searchParams.get("destination");
    let dayy = searchParams.get("dayOfWeek");

    const arr = [
        { category: "Adult", age: "(12+ Years)", count: 1 },
        { category: "Children", age: "(2 - 12 yrs)", count: 0 },
        { category: "Infant", age: "(Below 2 yrs)", count: 0 },
    ];
    const [flightResultdata, setflightResultdata] = useState([]);
    const [flightIn, setFlightIn] = useState(all.flightIn);
    const [flightOut, setFlightOut] = useState(all.flightOut);
    const [flightWhere, setFlightWhere] = useState([]);
    const [flightTo, setFlightTo] = useState([]);
    const [selectedFlightIn, setSelectedFlightIn] = useState(all.selectedFlightIn);
    const [selectedFlightOut, setSelectedFlightOut] = useState(all.selectedFlightOut);
    const [filteredAirportsFrom, setFilteredAirportsFrom] = useState([]);
    const [filteredAirportsTo, setFilteredAirportsTo] = useState([]);
    const [whereDate, setWhereDate] = useState(all.whereDate);
    const [toDate, setToDate] = useState(`${new Date().toISOString().split("T")[0]}`);
    const [day, setDay] = useState(all.day)
    const [isDisabled, setIsDisabled] = useState(true);
    const [way, setWay] = useState(false);
    const [rotateCateg, setRotateCateg] = useState({ transform: "rotate(0deg)" });
    const [selectVisible, setSelectVisible] = useState(false);
    const [adultcount, setAdultCount] = useState(1);
    const [childrencount, setChildrenCount] = useState(0);
    const [infantcount, setinfantCount] = useState(0);
    const [whereFrom, setWhereFrom] = useState(false);
    const [whereTo, setWhereTo] = useState(false);
    const [showSignup, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [inr, setInr] = useState(false);
    const [stop, setStop] = useState(false);
    const [rotateStop, setRotateStop] = useState({ transform: "rotate(0deg)" });
    const [depart, setDepart] = useState(false);
    const [rotateDepart, setRotateDepart] = useState({ transform: "rotate(0deg)" });
    const [oneWayPrice, setOneWayPrice] = useState(false);
    const [rotateOneWayPrice, setRotateOneWayPrice] = useState({ transform: "rotate(0deg)" });
    const [airlines, setAirlines] = useState(false);
    const [rotateAirlines, setRotateAirlines] = useState({ transform: "rotate(0deg)" });
    const [toggle, setToggle] = useState(false)
    const [range, setRange] = useState(4587)
    const [isVisible, setIsVisible] = useState(false)
    const [pages, setPages] = useState(1)
    const [flightDetails, setFlightDetails] = useState(false)
    const  [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [pop, setPop] = useState({})
  
    const navigate = useNavigate()
    const MyRef = useRef(null);

        const poptab = (key)=>{
            setPop({})
            setPop((prev)=>({...prev, [key] : !pop[key]}))
        }
    const handleIncrease = (category) => {
        switch (category) {
            case "Adult": setAdultCount(adultcount + 1);break;
            case "Children": setChildrenCount(childrencount + 1); break;
            case "Infant": setinfantCount(infantcount + 1); break;
            default: break;
        }
    };

    const handleDecrease = (category) => {
        switch (category) {
            case "Adult": adultcount > 1 && setAdultCount(adultcount - 1); break;
            case "Children": childrencount > 0 && setChildrenCount(childrencount - 1); break;
            case "Infant": infantcount > 0 && setinfantCount(infantcount - 1); break;
            default: break;
        }
    };

    const getAirlineInfo = (flightID) => {
        let logoSrc, airlineName;
        switch (flightID.slice(0, 2)) {
          case '6E': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/6E.svg'; airlineName = 'Indigo'; break;
          case 'AI': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/AI.svg'; airlineName = 'Air India'; break;
          case 'QP': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/QP.svg'; airlineName = 'Akasa Air'; break;
          case 'UK': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/UK.svg'; airlineName = 'Vistara'; break;
          case 'SG': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/SG.svg'; airlineName = 'Spicejet'; break;
          case 'IX': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/IX.svg'; airlineName = 'Air India Express'; break;
          case 'G8': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/G8.svg'; airlineName = 'GoAir'; break;
          case 'I5': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/I5.svg'; airlineName = 'AirAsia India'; break;
          default: logoSrc = ''; airlineName = '';
        }
        return { logoSrc, airlineName };
    };

    const handleSelectCategory = () => {
        setRotateCateg(selectVisible ? { transform: "rotate(0deg)", transition: "transform 0.3s ease-in-out" } : { transform: "rotate(180deg)", transition: "transform 0.3s ease-in-out" });
    };

    // const showWhereFrom = () => {
    //     setWhereFrom(!whereFrom);
    //     setWhereTo(false);
    //     setWay(false);
    //     setSelectVisible(false);
    // };

    // const showWhereTo = () => {
    //     setWhereFrom(false);
    //     setWhereTo(!whereTo);
    //     setWay(false);
    //     setSelectVisible(false);
    // };


    const onHandleSelectFlightIn = (selectedFlightIn) => {
        setSelectedFlightIn(selectedFlightIn);
        setFlightIn(`${selectedFlightIn.iata_code} - ${selectedFlightIn.city}, ${selectedFlightIn.country}`);
        setWhereFrom(false);
    };

    const onHandleSelectFlightOut = (selectedFlightOut) => {
        setSelectedFlightOut(selectedFlightOut);
        setFlightOut(`${selectedFlightOut.iata_code} - ${selectedFlightOut.city}, ${selectedFlightOut.country}`);
        setWhereTo(false);
    };

    const swapInputs = () => {
        if (selectedFlightIn && selectedFlightOut) {
            const tempFlightIn = { iata_code: selectedFlightIn.iata_code, city: selectedFlightIn.city, country: selectedFlightIn.country };
            const tempFlightOut = { iata_code: selectedFlightOut.iata_code, city: selectedFlightOut.city, country: selectedFlightOut.country };

            setSelectedFlightIn(tempFlightOut);
            setSelectedFlightOut(tempFlightIn);

            setFlightIn(`${tempFlightOut.iata_code} - ${tempFlightOut.city}, ${tempFlightOut.country}`);
            setFlightOut(`${tempFlightIn.iata_code} - ${tempFlightIn.city}, ${tempFlightIn.country}`);
        }

    };



    const handleStop = () => {
        setRotateStop(stop ? { transform: "rotate(0deg)", transition: "transform 0.3s ease-in-out" } : { transform: "rotate(180deg)", transition: "transform 0.3s ease-in-out" });
    };

    const handleDepart = () => {
        setRotateDepart(depart ? { transform: "rotate(0deg)", transition: "transform 0.3s ease-in-out" } : { transform: "rotate(180deg)", transition: "transform 0.3s ease-in-out" });
    };

    const handleOneWayPrice = () => {
        setRotateOneWayPrice(oneWayPrice ? { transform: "rotate(0deg)", transition: "transform 0.3s ease-in-out" } : { transform: "rotate(180deg)", transition: "transform 0.3s ease-in-out" });
    };
    const handleAirlines = () => {
        setRotateAirlines(airlines ? { transform: "rotate(0deg)", transition: "transform 0.3s ease-in-out" } : { transform: "rotate(180deg)", transition: "transform 0.3s ease-in-out" });
    };



    // -----------------flightResults----------------------

    const fetchFlights = useCallback(async () => {
      try {
          const response = await fetch(`${Base_URL}/flight?search={"source":"${flightFrom[0],flightFrom[1],flightFrom[2]}","destination":"${flightToo[0],flightToo[1],flightToo[2]}"}&day=${dayy}&page=${pages}`, {
              method: "GET",
              headers: {
                  projectID: Project_ID,
                  "Content-Type": "application/json",
              }
          })
          const result = await response.json()
            setflightResultdata((prevData) => [...prevData, ...result.data.flights]);
            setIsVisible(!isVisible);
        //   console.log(result)
        
      } catch (error) {
          console.log(error);
      }
  }, [flightFrom, flightToo])


    // -----------------flightResults----------------------

    // -----------------Single Flight Data----------------------
    // const fetchSingleFlight = useMemo(async () => {
    //     try {
    //         const response = await fetch(`${Base_URL}/flight?{"flightId":${flightResultdata.flightID}&day=${day}}`, { method: "GET", headers: { projectID: Project_ID, "Content-Type": "application/json" } });
    //         const result = await response.json();
    //     } catch (error) {
    //         return error;
    //     }
    // }, []);
    // console.log(flightResultdata)

    // -----------------Single Flight Data----------------------


    // --------------------FlightName_Search----------------------

    const fetchFlightsIn = useMemo(async () => {
        try {
            const response = await fetch(`${Base_URL}/airport?search={"city":"${flightWhere}"}`, { method: "GET", headers: { projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json();
            setFlightWhere(result.data.airports);
        } catch (error) {
            return error;
        }
    }, []);

    const fetchFlightsOut = useMemo(async () => {
        try {
            const response = await fetch(`${Base_URL}/airport?search={"city":"${flightTo}"}`, { method: "GET", headers: { projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json();
            setFlightTo(result.data.airports);
        } catch (error) {
            return error;
        }
    }, []);

    // --------------------Flight_Search----------------------

    const selectedDate = new Date(whereDate);
    const dayOfWeek = selectedDate.getDay();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const days = daysOfWeek[dayOfWeek];

    useEffect(() => {
        setDay(days)
   
        fetchFlights();
        // fetchSingleFlight;
        
        const fetchData = async ()=>{
            fetchFlightsIn;
 
            fetchFlightsOut;
 
            setIsVisible(!isVisible)
        }
        fetchData()

    }, [whereDate, fetchFlights]);

    const handleSearchResults = (e) => {
        e.preventDefault();
        setflightResultdata([]);
        setIsVisible(!isVisible);
        fetchFlights();
        (flightIn !== flightOut && flightIn !== "" && flightOut !== "" && whereDate !== "") && navigate(`/flights/results?source=${flightIn}&destination=${flightOut}&date=${whereDate}&dayOfWeek=${day}`)
    }

    const toggleSlider = () => {
        setToggle(!toggle)
        return
    }


    const handleFlightDetails = (index)=>{
        setFlightDetails(!flightDetails)
        setSelectedCardIndex(index)
    }

    
  const handleSignin = () => {
    if(localStorage.getItem('token')){
      setShowLogin(!showLogin)
    }else{
      setShowSignUp(!showSignup)
    }
  };

  const handleToBooking = ()=>{
    if(token){
        navigate(`/flights/results/itenary`)
    }else{
        navigate('/flights/results?source=LKO%20-%20Lucknow,%20India&destination=GOI%20-%20Goa,%20India&date=2024-01-23&dayOfWeek=Tue')
    }
  }

    return (
        <div className="ticket">
            {showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} token={token} setToken={setToken} pop={pop} poptab={poptab}/>}
            <div className="ticketHeader-container">
                <div id="ticketHeader">
                    <div id="ticketSupport" className="flexBet">
                        <div className="headerLogo-Icons flexY">
                            {logo}
                            <h1 onClick={() => navigate("/flights")}>{flightgo}</h1>
                            <h1 onClick={() => navigate("/hotel")}>{hotelIcon}</h1>
                        </div>
                        <div className="support-Btn flex">
                            <button className="ticketHeader-btn" onClick={() => poptab('inr')}>INR ₹</button>
                            {pop['inr'] && (
                                <div onClick={() => handleInr()} className="expand-INR flex">
                                    <h5>Popular currencies</h5>
                                    <div className="expand-INR-sec1 flexXY">
                                        <h2>Indian Rupee</h2>
                                        <h2>₹</h2>
                                    </div>
                                    <h5 className="expand-INR-currencies">Other currencies</h5>
                                </div>
                            )}
                            <button className="ticketHeader-btn flexXY" onClick={()=>navigate('/')}>{support} Support</button>
                            <div className="Login-button">
                            <button ref={MyRef} className="loginBtn-one flexXY" onClick={() => {handleSignin(), poptab('signin')}}>
                                {token? <><svg viewBox="0 0 14 14" height="16px" width="16px" class="c-inherit"><g fill="none" fill-rule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><circle cx="7" cy="7" r="6.25" stroke="currentColor" stroke-width="1.5"></circle><path fill="currentColor" d="M3,5 C4.38071187,5 5.5,3.88071187 5.5,2.5 C5.5,1.11928813 4.38071187,0 3,0 C1.61928813,0 0.5,1.11928813 0.5,2.5 C0.5,3.88071187 1.61928813,5 3,5 Z" transform="matrix(-1 0 0 1 10 3)"></path><path fill="currentColor" d="M7,9 C9.14219539,9 10.8910789,10.6839685 10.9951047,12.8003597 L11,13 L3,13 C3,10.790861 4.790861,9 7,9 Z"></path><circle cx="7" cy="7" r="7.75" stroke="#FFF" stroke-width="1.5"></circle></g></svg> My account</> : 'login / signup'}
                            </button>
                            {showSignup && pop['signin'] && <div className="login-popup"><Signup showSignup={showSignup} setShowSignUp={setShowSignUp} token={token} setToken={setToken}/></div>}
                            </div>
                        </div>
                    </div>
                    {inr && <div></div>}
                    <div className="ticketForm flexEnd">
                        <form className="ticketSearch-sec" onSubmit={(e) => handleSearchResults(e)}>
                            <div className="inputTicket flexXY">
                                <div className="input-text flexXY">
                                    <input
                                        id="inputSource"
                                        type="text"
                                        placeholder="Where from?"
                                        value={flightIn}
                                        onChange={(e) => { setFlightIn(e.target.value);}}
                                        onClick={() => { poptab('wayfrom')}}
                                    />
                                    <CgArrowsExchange className="exchangeIcon-one" onClick={() => swapInputs()} />
                                    {pop['wayfrom'] && (
                                        <div className="expand-whereFrom-one">
                                            {flightWhere.map((whereFromFlight, index) => (
                                                <div
                                                    key={whereFromFlight._id}
                                                    className="wherefrom-container-one flexXY"
                                                    onClick={() =>{ onHandleSelectFlightIn(whereFromFlight); poptab('wayfrom')}}
                                                >
                                                    <div className="short-one">{whereFromFlight.iata_code}</div>
                                                    <div className="full-one">{whereFromFlight.city}, {whereFromFlight.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <input
                                        id="inputDest"
                                        type="text"
                                        placeholder="Where to?"
                                        value={flightOut}
                                        onChange={(e) => { setFlightOut(e.target.value)}}
                                        onClick={() => { poptab('wayto')}}
                                    />
                                    {whereFrom === whereTo || whereFrom !== "" || whereTo !== "" && (
                                        <h5 className="error" style={{ color: "red" }}>Enter arrival airport / city</h5>
                                    )}
                                    {pop['wayto'] && (
                                        <div className="expand-whereTo-one">
                                            {flightTo.map((whereToFlight, index) => (
                                                <div
                                                    key={whereToFlight._id}
                                                    className="whereTo-container-one flexY"
                                                    onClick={() => {onHandleSelectFlightOut(whereToFlight); poptab('wayto')}}
                                                >
                                                    <div className="short-one">
                                                        {whereToFlight.iata_code}
                                                    </div>
                                                    <div className="full-one">
                                                        {whereToFlight.city}, {whereToFlight.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="input-date flexXY">
                                        <div className="flexXY">
                                            <input
                                                className="input-date1"
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}
                                                value={whereDate}
                                                onChange={(e) => setWhereDate(e.target.value)}
                                                onClick={()=>poptab('date1')}
                                            />
                                            <input
                                                className="input-date2"
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}
                                                value={isDisabled ? "Return" : whereTo}
                                                onChange={(e) => setToDate(e.target.value)}
                                                onClick={()=>poptab('date2')}
                                                disabled={isDisabled}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="selectTicket flex">
                                    <div
                                        className="selectCateg flexXY"
                                        onClick={() =>{ handleSelectCategory(),poptab('selecttraveller')}}
                                    >
                                        <h4>
                                            {adultcount && (
                                                <>
                                                    {" "}
                                                    {adultcount} <span>Traveller </span>{" "}
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
                                        {/* <h4>{classs}</h4> */}
                                        <MdKeyboardArrowDown style={rotateCateg} className="" />
                                    </div>

                                    {pop['selecttraveller'] && (
                                        <div className="selectCateg-Expand-one">
                                            {arr.map((items, index) => (
                                                <div className="selectCateg-Expand-container-one flexBet">
                                                    <div>
                                                        <h1>{items.category}</h1>
                                                        <h5>{items.age}</h5>
                                                    </div>
                                                    <div className="selectCateg-count-one flexXY">
                                                        <CgMathMinus
                                                            className={`${(items.category === "Adult" && adultcount > 1) ||
                                                                    (items.category === "Children" &&
                                                                        childrencount > 0) ||
                                                                    (items.category === "Infant" && infantcount > 0)
                                                                    ? "changeToPosIcon-one"
                                                                    : "countNegIcon-one"
                                                                }`}
                                                            onClick={() => handleDecrease(items.category)}
                                                        />
                                                        <h1>
                                                            {items.category === "Adult"
                                                                ? adultcount
                                                                : items.category === "Children"
                                                                    ? childrencount
                                                                    : infantcount}
                                                        </h1>
                                                        <CgMathPlus
                                                            className="countPosIcon-one"
                                                            onClick={() => handleIncrease(items.category)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="searchBtn">
                                    <button id="flightSearchBtn"  onClick={() =>{poptab('searchFlites')}}>Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="ticketMain-container">
                <div id="main" className="flex">
                    <div id="aside">
                        <div id="stops">
                            <div onClick={() => {handleStop(), poptab('stop')}} className="flexBet">
                                <h1>Stops</h1>
                                <MdKeyboardArrowUp style={rotateStop} className="fs" />
                            </div>
                            {!pop['stop'] && (
                                <div className="stop-container">
                                    <input
                                        className="styled-checkbox"
                                        type="checkbox"
                                        id="non-stop"
                                    />{" "}
                                    <label for="non-stop">Non-stop</label>
                                    <br />
                                    <input
                                        type="checkbox"
                                        className="styled-checkbox"
                                        id="1-stop"
                                    />{" "}
                                    <label for="1-stop">1 stop</label>
                                    <br />
                                    <input
                                        type="checkbox"
                                        className="styled-checkbox"
                                        id="2-stops"
                                    />{" "}
                                    <label for="2-stop">2 stops</label>
                                </div>
                            )}
                        </div>
                        <div id="departure">
                            <div onClick={() =>{ handleDepart(), poptab('depart')}} className="flexBet">
                                <h1>Departure</h1>
                                <MdKeyboardArrowUp style={rotateDepart} className="fs" />
                            </div>
                            {!pop['depart'] && (
                                <>
                                    <input
                                        type="checkbox"
                                        className="styled-checkbox"
                                        id="early-morning"
                                    />{" "}
                                    <label for="early-morning">Early morning</label>
                                    <br />
                                    <input
                                        type="checkbox"
                                        className="styled-checkbox"
                                        id="morning"
                                    />{" "}
                                    <label for="morning">Morning</label>
                                    <br />
                                    <input
                                        type="checkbox"
                                        className="styled-checkbox"
                                        id="afternoon"
                                    />{" "}
                                    <label for="afternoon">Afternoon</label>
                                    <br />
                                    <input
                                        type="checkbox"
                                        className="styled-checkbox"
                                        id="evening"
                                    />{" "}
                                    <label for="evening">Evening</label>
                                    <br />
                                    <input
                                        type="checkbox"
                                        className="styled-checkbox"
                                        id="night"
                                    />{" "}
                                    <label for="night">Night</label>
                                    <br />
                                </>
                            )}
                        </div>
                        <div id="one-way-price" className="flex">
                            <div onClick={() => {handleOneWayPrice(), poptab('oneway')}} className="flexBet">
                                <h1>One-way price</h1>
                                <MdKeyboardArrowUp style={rotateOneWayPrice} className="fs" />
                            </div>
                            {!pop['oneway'] && (
                                <div className="one-way-price-sec1">
                                    <h6>Up to {range}</h6>
                                    <input type="range" value={range} min={4587} max={62689} onChange={(e) => setRange(e.target.value)} />
                                    <div className="one-way-price-sec2 flexBet">
                                        <h6>₹4587</h6>
                                        <h6>₹62689</h6>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div id="airlines">
                            <div onClick={() => {handleAirlines(), poptab('airline')}} className="flexBet">
                                <h1>Airlines</h1>
                                <MdKeyboardArrowUp style={rotateAirlines} className="fs" />
                            </div>
                            {!pop['airline'] && (
                                <>
                                    <div className="check ">
                                        <input
                                            type="checkbox"
                                            className="styled-checkbox"
                                            id="multi-airlines"
                                        />{" "}
                                        <label for="multi-airlines">
                                            Show multi-airline itineraries
                                        </label>
                                        <br />
                                    </div>
                                    <div className="airline-check flexBet">
                                        <div className="">
                                            <input
                                                className="styled-checkbox"
                                                type="checkbox"
                                                id="indgo"
                                            />{" "}
                                            <label for="indgo">Air India</label>
                                            <br />
                                        </div>
                                        <h6>₹Price</h6>
                                    </div>
                                    <div className="airline-check flexBet">
                                        <div>
                                            <input
                                                className="styled-checkbox"
                                                type="checkbox"
                                                id="air-india"
                                            />{" "}
                                            <label for="air-india">IndiGo</label>
                                            <br />
                                        </div>
                                        <h6>₹Price</h6>
                                    </div>
                                    <div className="airline-check flexBet">
                                        <div>
                                            <input
                                                className="styled-checkbox"
                                                type="checkbox"
                                                id="vistara"
                                            />{" "}
                                            <label for="vistara">Vistara</label>
                                            <br />
                                        </div>
                                        <h6>₹Price</h6>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div id="main-content">
                        <div className="ticket-content-header flexBet">
                            <div className="ticket-content-header-sec1 flexBet">
                                <h6>Airlines</h6>
                                <div className="ticket-content-header-links flexBet">
                                    <h6 >Departure</h6>
                                    <h6 >Duration</h6>
                                    <h6 >Arrival</h6>
                                </div>
                            </div>
                            <div className="ticket-content-header-sec2 flexBet">
                                <div className="price flex"><h6 >Price </h6></div>
                                <div className="ticket-content-header-sec3 flexBet">
                                    <h6 class>Smart sort</h6>{sortIcon}
                                    <div className="toggle-button flexY">
                                        <span className={`slider-round ${toggle ? 'toggled' : ""}`} onClick={() => toggleSlider()}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-content-card">
                            {flightResultdata.map((result, index) => (
                                <div key={index} className="content-card">
                                    <h6>Enjoy free meal</h6>
                                    <div className=" flexBet">
                                        <div className=" content-card-container flexBet">
                                            <div className="content-card-container-airline">
                                                <div className="flexXY">
                                                    <div>
                                                    <img src={getAirlineInfo(result.flightID).logoSrc} alt="Logo" />
                                                    </div>
                                                    <div className="content-card-container-airline-name">
                                                        <h5>{getAirlineInfo(result.flightID).airlineName}</h5>
                                                        <h6>{result.flightID.slice(0,2)}-{result.flightID.slice(13,16)}</h6>
                                                    </div>
                                                </div>
                                                <h4 onClick={()=>handleFlightDetails(index)}>{flightDetails && selectedCardIndex === index ? 'Hide details' : 'Flight details'}</h4>
                                            </div>
                                            <div className="content-card-links flexBet">
                                                <h3>{result.departureTime}</h3>
                                                <div className="content-card-duration flexXY">
                                                    <h4>{result.duration}h {result.duration}m</h4>
                                                    <div id="line">
                                                        <div className="line-circle-container flexBet">
                                                            <div className="line-circle"></div>
                                                            <div className="line-circle"></div>
                                                        </div>
                                                    </div>
                                                    <h4>{result.stops}</h4>
                                                </div>
                                                <h3>{result.arrivalTime}</h3>
                                            </div>
                                        </div>
                                        <div className="content-card-price-book-container flexBet">
                                            <h3>₹{result.ticketPrice}</h3>
                                            <h2 onClick={()=>handleToBooking()} className="content-card-book-btn">Book</h2>
                                        </div>
                                        {
                                        flightDetails && selectedCardIndex === index &&
                                        <div className="content-card-flight-details">
                                            <div className="content-card-flight-details-header flexBet">
                                                <div className="content-card-header-head1 flexXY">
                                                    <h4>Bangalore <HiOutlineArrowNarrowRight/> Kolkata</h4>
                                                    <p>Fri, 26 Jan</p>
                                                </div>
                                                <div className="content-card-header-head2 flexXY">
                                                    <h6>Partially Refundable</h6>
                                                    <p>Know more</p>
                                                </div>
                                            </div>
                                            <div className="content-card-container-details-airline flexBet">
                                                <div className="content-card-container-details-sec1 flexBet">
                                                    <div>
                                                        <img src={getAirlineInfo(result.flightID).logoSrc}/>
                                                    </div>
                                                    <div className="content-card-container-airline-name">
                                                        <h5>{getAirlineInfo(result.flightID).airlineName}</h5>
                                                    </div>
                                                    <div className="flexC">
                                                        <h6>{result.flightID.slice(0,2)}-{result.flightID.slice(13,16)}</h6>
                                                        <h5>Economy</h5>
                                                    </div>
                                                </div>
                                                    <div className="content-card-links flexBet">
                                                        <h3>{result.departureTime}</h3>
                                                        <div className="content-card-duration flexXY">
                                                            <h4>{result.duration}h {result.duration}m</h4>
                                                            <div id="line">
                                                                <div className="line-circle-container flexBet">
                                                                    <div className="line-circle"></div>
                                                                    <div className="line-circle"></div>
                                                                </div>
                                                            </div>
                                                            <h4>{result.stops}</h4>
                                                        </div>
                                                        <h3>{result.arrivalTime}</h3>
                                                    </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {!isVisible && <span class="loader"></span>}
        </div>
    );
}
