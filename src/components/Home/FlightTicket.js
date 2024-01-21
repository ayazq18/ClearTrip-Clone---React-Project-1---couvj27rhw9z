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
    const [filteredAirports, setFilteredAirports] = useState([]);
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
    const [token, setToken] = useState(all.token);

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
    const [sortCriteria, setSortCriteria] = useState("departure");
    const [sortOrder, setSortOrder] = useState(1);
    const [sortParticular, setSortParticular] = useState("stop");
    const [sortdown, setSortDown] = useState(1);
    const [pages, setPages] = useState(1)
    const [flightDetails, setFlightDetails] = useState(false)
    const  [selectedCardIndex, setSelectedCardIndex] = useState(null);
    
  
    const navigate = useNavigate()
    const MyRef = useRef(null);

    const handleIncrease = (category) => {
        switch (category) {
            case "Adult": setAdultCount(adultcount + 1);cbreak;
            case "Children": setChildrenCount(childrencount + 1); break;
            case "Infant":csetinfantCount(infantcount + 1); break;
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
        setSelectVisible(!selectVisible);
        setWhereFrom(false);
        setWhereTo(false);
        setWay(false);
        setInr(false)
        setRotateCateg(selectVisible ? { transform: "rotate(0deg)", transition: "transform 0.3s ease-in-out" } : { transform: "rotate(180deg)", transition: "transform 0.3s ease-in-out" });
    };

    const showWhereFrom = () => {
        setWhereFrom(!whereFrom);
        setWhereTo(false);
        setWay(false);
        setSelectVisible(false);
    };

    const showWhereTo = () => {
        setWhereFrom(false);
        setWhereTo(!whereTo);
        setWay(false);
        setSelectVisible(false);
    };

    const filteredAirportsSearch = (input, isWhereFrom) => {
        const filtered = flightWhere.filter((airport) => {
            const airportName = (isWhereFrom && airport.iata_code) || airport.city || airport.name || airport.city;
            return airportName.toLowerCase().includes(input.toLowerCase());
        });
        setFilteredAirports(filtered);
    };

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

    const handleInr = ()=>{
        setInr(!inr)
    }

    const handleStop = () => {
        setInr(false);
        setStop(!stop);
        setRotateStop(stop ? { transform: "rotate(0deg)", transition: "transform 0.3s ease-in-out" } : { transform: "rotate(180deg)", transition: "transform 0.3s ease-in-out" });
    };

    const handleDepart = () => {
        setInr(false);
        setDepart(!depart);
        setRotateDepart(depart ? { transform: "rotate(0deg)", transition: "transform 0.3s ease-in-out" } : { transform: "rotate(180deg)", transition: "transform 0.3s ease-in-out" });
    };

    const handleOneWayPrice = () => {
        setOneWayPrice(!oneWayPrice);
        setRotateOneWayPrice(oneWayPrice ? { transform: "rotate(0deg)", transition: "transform 0.3s ease-in-out" } : { transform: "rotate(180deg)", transition: "transform 0.3s ease-in-out" });
    };
    const handleAirlines = () => {
        setAirlines(!airlines);
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
    const fetchSingleFlight = useMemo(async () => {
        try {
            const response = await fetch(`${Base_URL}/flight?{"flightId":${flightResultdata.flightID}&day=${day}}`, { method: "GET", headers: { projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json();
            console.log(result)
            // setFlightWhere(result.data.airports);
        } catch (error) {
            return error;
        }
    }, []);
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


    // ---------------------------Sorting-----------------------------

      const handleSortFlights = useCallback(async (parameter, order) => {
        try {
          const response = await fetch(
            `${Base_URL}/flight?search={"source":"${flightFrom[0],flightFrom[1],flightFrom[2]}","destination":"${flightToo[0],flightToo[1],flightToo[2]}"}&day=${dayy}&sort={"${parameter}":${order}}`,
            {
              method: "GET",
              headers: {
                projectID: Project_ID,
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();
          setflightResultdata(result.data.flights);
          console.log()
        } catch (error) {
          console.log(error);
        }
      }, []);

      const handleSort = (parameter) => {
        setSortCriteria(parameter);
        setSortOrder((prevOrder)=>(parameter === sortCriteria ? -prevOrder : 1));
        handleSortFlights(parameter, sortOrder);
      };

    // ---------------------------Sorting-----------------------------



    const selectedDate = new Date(whereDate);
    const dayOfWeek = selectedDate.getDay();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const days = daysOfWeek[dayOfWeek];

    useEffect(() => {
        setDay(days)
      
        fetchFlightsIn;
        fetchFlightsOut;
        fetchFlights();
        fetchSingleFlight;
        // console.log(flightResultdata)
        setIsVisible(false)

    }, [whereDate, fetchFlights]);

    const handleSearchResults = (e) => {
        e.preventDefault();
        setflightResultdata([]);
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

    return (
        <div className="ticket ">
            {/* {!showSignup && <Signup showSignup={showSignup} setShowSignUp={setShowSignUp} token={token} setToken={setToken}/>}
            {showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} token={token} setToken={setToken}/>} */}
            <div className="ticketHeader-container">
                <div id="ticketHeader">
                    <div id="ticketSupport" className="flexBet">
                        <div className="headerLogo-Icons flexY">
                            {logo}
                            <h1 onClick={() => navigate("/flights")}>{flightgo}</h1>
                            <h1 onClick={() => navigate("/hotel")}>{hotelIcon}</h1>
                        </div>
                        <div className="support-Btn flex">
                            <button className="ticketHeader-btn" onClick={() => handleInr()}>INR ₹</button>
                            {inr && (
                                <div onClick={() => handleInr()} className="expand-INR flex">
                                    <h5>Popular currencies</h5>
                                    <div className="expand-INR-sec1 flexXY">
                                        <h2>Indian Rupee</h2>
                                        <h2>₹</h2>
                                    </div>
                                    <h5 className="expand-INR-currencies">Other currencies</h5>
                                </div>
                            )}
                            <button className="ticketHeader-btn flexXY">{support} Support</button>
                            <button ref={MyRef} className="loginBtn-one flexXY" onClick={() => handleSignin()}>
                                {token !== '' ? 'My account' : 'login/signup'}
                            </button>
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
                                        onChange={(e) => { setFlightIn(e.target.value); showWhereFrom(flightWhere); filteredAirportsSearch(e.target.value, true); }}
                                        onClick={() => { showWhereFrom(); }}
                                    />
                                    <CgArrowsExchange className="exchangeIcon-one" onClick={() => swapInputs()} />
                                    {whereFrom && (
                                        <div className="expand-whereFrom-one">
                                            {flightWhere.map((whereFromFlight, index) => (
                                                <div
                                                    key={whereFromFlight._id}
                                                    className="wherefrom-container-one flexXY"
                                                    onClick={() => onHandleSelectFlightIn(whereFromFlight)}
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
                                        onChange={(e) => { setFlightOut(e.target.value), showWhereTo(flightTo), filteredAirportsSearch(e.target.value, true); }}
                                        onClick={() => { showWhereTo(); }}
                                    />
                                    {whereFrom === whereTo || whereFrom !== "" || whereTo !== "" && (
                                        <h5 className="error" style={{ color: "red" }}>Enter arrival airport / city</h5>
                                    )}
                                    {whereTo && (
                                        <div className="expand-whereTo-one">
                                            {flightTo.map((whereToFlight, index) => (
                                                <div
                                                    key={whereToFlight._id}
                                                    className="whereTo-container-one flexY"
                                                    onClick={() => onHandleSelectFlightOut(whereToFlight)}
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
                                            />
                                            <input
                                                className="input-date2"
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}
                                                value={isDisabled ? "Return" : whereTo}
                                                onChange={(e) => setToDate(e.target.value)}
                                                disabled={isDisabled}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="selectTicket flex">
                                    <div
                                        className="selectCateg flexXY"
                                        onClick={() => handleSelectCategory()}
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

                                    {selectVisible && (
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
                                    <button id="flightSearchBtn">Search</button>
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
                            <div onClick={() => handleStop()} className="flexBet">
                                <h1>Stops</h1>
                                <MdKeyboardArrowUp style={rotateStop} className="fs" />
                            </div>
                            {!stop && (
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
                            <div onClick={() => handleDepart()} className="flexBet">
                                <h1>Departure</h1>
                                <MdKeyboardArrowUp style={rotateDepart} className="fs" />
                            </div>
                            {!depart && (
                                <>
                                    <input
                                        type="checkbox"
                                        className="styled-checkbox"
                                        id="early-morning"
                                        onClick={()=>handleSort('departure')}
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
                            <div onClick={() => handleOneWayPrice()} className="flexBet">
                                <h1>One-way price</h1>
                                <MdKeyboardArrowUp style={rotateOneWayPrice} className="fs" />
                            </div>
                            {!oneWayPrice && (
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
                            <div onClick={() => handleAirlines()} className="flexBet">
                                <h1>Airlines</h1>
                                <MdKeyboardArrowUp style={rotateAirlines} className="fs" />
                            </div>
                            {!airlines && (
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
                                {/* <IoIosArrowRoundUp className={`${toggle ? 'upDown' : ''}`} style={{ fontSize: "12px" }} /> */}
                                <div className="ticket-content-header-links flexBet">
                                    <h6 onClick={()=>handleSort('departure')}>Departure</h6>
                                    <h6 onClick={()=>handleSort('duration')}>Duration</h6>
                                    <h6 onClick={()=>handleSort('arrival')}>Arrival</h6>
                                </div>
                            </div>
                            <div className="ticket-content-header-sec2 flexBet">
                                <div className="price flex"><h6 onClick={()=>handleSort('ticketPrice')}>Price </h6></div>
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
                                            <h2 className="content-card-book-btn">Book</h2>
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
