let tl;
import React, { useEffect, useState, useContext, useRef, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FlightTicket.css";
import { handleIncrease } from "../Constants";
import { getAirlineInfo } from '../Constants';
import { MdKeyboardArrowUp } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { logo, flightgo, hotelIcon, support, sortIcon, clockIcon, } from "../Services/Icons";
import Login from "../Login/Login";
import Signup from "../Signup/Signup.js";
import { arr } from "../Constants";
import MultiRangeSlider from "multi-range-slider-react";
import { Base_URL, Project_ID, App_Type } from "../Constants";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAuthContext } from "../ContextAllData.js";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function FlightTicket() {
    const { all, setall } = useAuthContext();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let flightFrom = searchParams.get("source");
    let flightToo = searchParams.get("destination");
    let dayy = searchParams.get("dayOfWeek");
    let date = searchParams.get("date");

    const [filter, setfilter] = useState({ "6E": true, "SG": true, "I5": true, "UK": true, "AI": true, "QP": true, "S5": true, "stops": null });
    const [flightResultdata, setflightResultdata] = useState([]);
    const [flightIn, setFlightIn] = useState(flightFrom);
    const [flightOut, setFlightOut] = useState(flightToo);
    const [flightWhere, setFlightWhere] = useState();
    const [flightTo, setFlightTo] = useState();
    const [selectedFlightIn, setSelectedFlightIn] = useState(all.selectedFlightIn);
    const [selectedFlightOut, setSelectedFlightOut] = useState(all.selectedFlightOut);
    const [whereDate, setWhereDate] = useState(date);
    const [toDate, setToDate] = useState(`${new Date().toISOString().split("T")[0]}`);
    const [day, setDay] = useState(all.day)
    const [isDisabled, setIsDisabled] = useState(true);
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
    const [toggle, setToggle] = useState(false)
    const [flightDetails, setFlightDetails] = useState(false)
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [pop, setPop] = useState({})
    const [pagination, setPagination] = useState(1)
    const [resultforpagination, setresultforpagination] = useState()
    const [flightResultsortingnav, setflightResultsortingnav] = useState({});
    const [minrange, setminrange] = useState(1000);
    const [maxrange, setmaxrange] = useState(5000);
    const [onewayPrice, setonewayPrice] = useState("2,500");
    const [tripdurationmin, settripdurationmin] = useState(1);
    const [tripdurationmax, settripdurationmax] = useState(10);
    const [valuee, setvaluee] = useState(2500);
    const [filterPopup, setfilterPopup] = useState({ stops: false, departure: false, wayprice: false, airline: false, duration: false, layover: false });

    const navigate = useNavigate()
    const MyRef = useRef(null);

    function airlineSelectorwithvalue(key, value) {
        setTimeout(() => {
            if (filter[key] == value) {
                setfilter((prev) => ({ ...prev, [key]: null }))
            }
            else {
                setfilter((prev) => ({ ...prev, [key]: value }));
            }
        }, 10);

    }

    const onewayPricewithoutcomma = () => {
        return parseInt(onewayPrice.replace(/,/g, ''), 10);
    }
    const onewayPricewithcomma = (number) => {
        clearTimeout(tl);
        tl = setTimeout(() => {
            setvaluee(number);
        }, 1000);
        setonewayPrice(number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    };

    const poptab = (key) => {
        setPop({})
        setPop((prev) => ({ ...prev, [key]: !pop[key] }))
    }
    const handleIncrease = (category) => {
        switch (category) {
            case "Adult": setAdultCount(adultcount + 1); break;
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

    const handleSelectCategory = () => {
        setRotateCateg(selectVisible ? { transform: "rotate(0deg)", transition: "transform 0.3s ease-in-out" } : { transform: "rotate(180deg)", transition: "transform 0.3s ease-in-out" });
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


    function sortingnav(key) {
        setflightResultsortingnav({})
        setflightResultsortingnav({ [key]: !flightResultsortingnav[key] });
    }

    function navigateToFlightInfo(_id, flightId) {
        if (localStorage.getItem("token")) {
            setall(prev =>({...prev, dayy:dayy}))
            navigate(`/flights/results/Info?flightid=${_id}&ID=${flightId}`)
        }
        else {
           alert('Please login before proceed !')
        }
    }
    

    // -----------------flightResults----------------------

    const fetchFlights = async () => {
        try {
            const response = await fetch(`${Base_URL}/flight?search={"source":"${flightIn[0], flightIn[1], flightIn[2]}","destination":"${flightOut[0], flightOut[1], flightOut[2]}"}&day=${dayy}&filter={${filter.stops != null ? `"stops":${filter.stops},` : ""}${`"ticketPrice":{"$lte":${valuee}}`},"duration":{"$lte":${tripdurationmax},"$gte":${tripdurationmin}}}&page=${pagination}&limit=20&sort={${Object.keys(flightResultsortingnav).length === 0 ? "" : `"${Object.keys(flightResultsortingnav)[0]}":${flightResultsortingnav[`${Object.keys(flightResultsortingnav)[0]}`] == true ? "1" : "-1"}`}}`, {
                method: "GET",
                headers: {
                    projectID: Project_ID,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json()
            setflightResultdata(result.data.flights);
            setresultforpagination(result.totalResults)
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }

    // -----------------flightResults----------------------

    // --------------------FlightName_Search----------------------

    const fetchFlightsIn = useMemo(async () => {
        try {
            const response = await fetch(`${Base_URL}/airport?search={"city":"${flightIn[0], flightIn[1], flightIn[2]}"}`, { method: "GET", headers: { projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json();
            setFlightWhere(result.data.airports);
        } catch (error) {
            return error;
        }
    }, [])

    const fetchFlightsOut= useMemo(async() => {
        try {
            const response = await fetch(`${Base_URL}/airport?search={"city":"${flightOut[0], flightOut[1], flightOut[2]}"}`, { method: "GET", headers: { projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json();
            setFlightTo(result.data.airports);
        } catch (error) {
            return error;
        }
    }, [])

    // --------------------Flight_Search----------------------

    const selectedDate = new Date(whereDate);
    const dayOfWeek = selectedDate.getDay();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const days = daysOfWeek[dayOfWeek];

    function formatDate(inputdate) {
        const options = { month: 'short', day: 'numeric', weekday: 'short'};
        const formattedDate = new Date(inputdate).toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const formatdatefrom = formatDate(date)

    useEffect(() => {
        setDay(days)

        fetchFlights();
            fetchFlightsIn;
            fetchFlightsOut;

    }, [valuee, filter, flightResultsortingnav, tripdurationmin, tripdurationmax, pagination]);

    const handleSearchResults = (e) => {
        e.preventDefault();
        // setflightResultdata([]);
        fetchFlights();
        (flightIn !== flightOut && flightIn !== "" && flightOut !== "" && whereDate !== "") && navigate(`/flights/results?source=${flightIn}&destination=${flightOut}&date=${whereDate}&dayOfWeek=${day}`)
    }

    const toggleSlider = () => {
        setToggle(!toggle)
        return
    }

    const handleFlightDetails = (index) => {
        setFlightDetails(!flightDetails)
        setSelectedCardIndex(index)
    }

    const handleSignin = () => {
        if (localStorage.getItem('token')) {
            setShowLogin(!showLogin)
        } else {
            setShowSignUp(!showSignup)
        }
    };

    return (
        <div className="ticket">
            {showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} token={token} setToken={setToken} pop={pop} poptab={poptab} />}
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
                            <button className="ticketHeader-btn flexXY" onClick={() => navigate('/')}>{support} Support</button>
                            <div className="Login-button">
                                <button ref={MyRef} className="loginBtn-one flexXY" onClick={() => { handleSignin(), poptab('signin') }}>
                                    {token ? <><svg viewBox="0 0 14 14" height="16px" width="16px" class="c-inherit"><g fill="none" fill-rule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><circle cx="7" cy="7" r="6.25" stroke="currentColor" stroke-width="1.5"></circle><path fill="currentColor" d="M3,5 C4.38071187,5 5.5,3.88071187 5.5,2.5 C5.5,1.11928813 4.38071187,0 3,0 C1.61928813,0 0.5,1.11928813 0.5,2.5 C0.5,3.88071187 1.61928813,5 3,5 Z" transform="matrix(-1 0 0 1 10 3)"></path><path fill="currentColor" d="M7,9 C9.14219539,9 10.8910789,10.6839685 10.9951047,12.8003597 L11,13 L3,13 C3,10.790861 4.790861,9 7,9 Z"></path><circle cx="7" cy="7" r="7.75" stroke="#FFF" stroke-width="1.5"></circle></g></svg> My account</> : 'login / signup'}
                                </button>
                                {showSignup && pop['signin'] && <div className="login-popup"><Signup showSignup={showSignup} setShowSignUp={setShowSignUp} token={token} setToken={setToken} /></div>}
                            </div>
                        </div>
                    </div>
                    <div className="ticketForm flexEnd">
                        <form className="ticketSearch-sec" onSubmit={(e) => handleSearchResults(e)}>
                            <div className="inputTicket flexXY">
                                <div className="input-text flexXY">
                                    <input
                                        id="inputSource"
                                        type="text"
                                        placeholder="Where from?"
                                        value={flightIn}
                                        onChange={(e) => { setFlightIn(e.target.value); fetchFlightsIn(e.target.value) }}
                                        onClick={() => { poptab('wayfrom') }}
                                    />
                                    <CgArrowsExchange className="exchangeIcon-one" onClick={() => swapInputs()} />
                                    {pop['wayfrom'] && (
                                        <div className="expand-whereFrom-one">
                                            {flightWhere && flightWhere.map((whereFromFlight, index) => (
                                                <div
                                                    key={whereFromFlight._id}
                                                    className="wherefrom-container-one flexXY"
                                                    onClick={() => { onHandleSelectFlightIn(whereFromFlight); poptab('wayfrom') }}
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
                                        onChange={(e) => { setFlightOut(e.target.value); fetchFlightsOut(e.target.value) }}
                                        onClick={() => { poptab('wayto') }}
                                    />
                                    {whereFrom === whereTo || whereFrom !== "" || whereTo !== "" && (
                                        <h5 className="error" style={{ color: "red" }}>Enter arrival airport / city</h5>
                                    )}
                                    {pop['wayto'] && (
                                        <div className="expand-whereTo-one">
                                            {flightTo && flightTo.map((whereToFlight, index) => (
                                                <div
                                                    key={whereToFlight._id}
                                                    className="whereTo-container-one flexY"
                                                    onClick={() => { onHandleSelectFlightOut(whereToFlight); poptab('wayto') }}
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
                                                onClick={() => poptab('date1')}
                                            />
                                            <input
                                                className="input-date2"
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}
                                                value={isDisabled ? "Return" : whereTo}
                                                onChange={(e) => setToDate(e.target.value)}
                                                onClick={() => poptab('date2')}
                                                disabled={isDisabled}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="selectTicket flex">
                                    <div
                                        className="selectCateg flexXY"
                                        onClick={() => { handleSelectCategory(), poptab('selecttraveller') }}
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
                                    <button id="flightSearchBtn" onClick={() => { poptab('searchFlites') }}>Search</button>
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
                            <div onClick={() => { poptab('stop') }} className="flexBet">
                                <h1>Stops</h1>
                                <MdKeyboardArrowUp className={`fs ${!pop['stop'] ? 'rotatedegree' : 'rotatezero'}`} />
                            </div>
                            {!pop['stop'] && (
                                <div className="stop-container">
                                    <label onClick={() => { airlineSelectorwithvalue("stops", 0) }} for="non-stop" className='flex g10'><div className='flexX g5'><input className="styled-checkbox" type='checkbox' id='non-stop' /><p>Non-stop</p></div></label>
                                    <label onClick={() => { airlineSelectorwithvalue("stops", 1) }} for="1-stop" className='flex g10'><div className='flexY g5'><input className="styled-checkbox" type='checkbox' id='1-stop' /><p>1 stop</p></div></label>
                                    <label onClick={() => { airlineSelectorwithvalue("stops", 2) }} for="2-stop" className='flex g10'><div className='flexY g5'><input className="styled-checkbox" type='checkbox' id='2-stop'  /><p>2 stop</p></div></label>
                                </div>
                            )}
                        </div>
                        <div className='wayprice flex' onClick={() => { poptab("wayprice") }}>
                            <p>One-way price</p>
                            <MdKeyboardArrowUp className="fs" />
                        </div>
                        {!pop["wayprice"] &&
                            <div className='filterPopupwayprice flex flexc'>
                                <p>Up to ₹{onewayPrice}</p>
                                <input type='range' min="1127" max="2500" value={onewayPricewithoutcomma()} onChange={(e) => { onewayPricewithcomma(e.target.value); }} />
                                <div className='flexBet'><p>₹1,127</p><p>₹2,500</p></div>
                            </div>}
                        <div id="one-way-price" className="flex">
                            <div onClick={() => { poptab('oneway') }} className="flexBet">
                                <h1>Trip duration</h1>
                                <MdKeyboardArrowUp className="fs" />
                            </div>
                            {!pop['oneway'] && (
                                <div className="one-way-price-sec1">
                                    <div className='flexBet'><p>{tripdurationmin} hours</p><p>{tripdurationmax} hours</p></div>
                                    <MultiRangeSlider min={1} max={10} minValue={tripdurationmin} ruler="false" label="false" maxValue={tripdurationmax} step={1} onInput={(e) => { settripdurationmin(e.minValue); settripdurationmax(e.maxValue); }} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div id="main-content">
                        <div className="ticket-content-header flexBet">
                            <div className="ticket-content-header-sec1 flexBet">
                                <div>Airlines</div>
                                <div className="ticket-content-header-links flexBet">
                                    <div className={flightResultsortingnav["departureTime"] ? "activesortingnavColor" : flightResultsortingnav["departureTime"] == false ? "activesortingnavColor" : null} onClick={() => { sortingnav("departureTime") }}>Departure &nbsp;{(flightResultsortingnav["departureTime"] == false && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" style={{ transform: `rotate(${-180}deg)` }}><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}{(flightResultsortingnav["departureTime"] == true && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" ><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}</div>
                                    <div className={flightResultsortingnav["duration"] ? "activesortingnavColor" : flightResultsortingnav["duration"] == false ? "activesortingnavColor" : null} onClick={() => { sortingnav("duration") }}>Duration &nbsp;{(flightResultsortingnav["duration"] == false && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" style={{ transform: `rotate(${-180}deg)` }}><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}{(flightResultsortingnav["duration"] == true && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" ><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}</div>
                                    <div className={flightResultsortingnav["arrivalTime"] ? "activesortingnavColor" : flightResultsortingnav["arrivalTime"] == false ? "activesortingnavColor" : null} onClick={() => { sortingnav("arrivalTime") }}>Arrival &nbsp;{(flightResultsortingnav["arrivalTime"] == false && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" style={{ transform: `rotate(${-180}deg)` }}><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}{(flightResultsortingnav["arrivalTime"] == true && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" ><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}</div>
                                    <div className={flightResultsortingnav["ticketPrice"] ? "activesortingnavColor" : flightResultsortingnav["ticketPrice"] == false ? "activesortingnavColor" : null} onClick={() => { sortingnav("ticketPrice") }}>Price &nbsp;{(flightResultsortingnav["ticketPrice"] == false && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" style={{ transform: `rotate(${-180}deg)` }}><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}{(flightResultsortingnav["ticketPrice"] == true && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" ><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}</div>
                                </div>
                            </div>
                            <div className="ticket-content-header-sec3 flexBet">
                                <h6 class>Smart sort</h6>{sortIcon}
                                <div className="toggle-button flexY">
                                    <span className={`slider-round ${toggle ? 'toggled' : ""}`} onClick={() => toggleSlider()}></span>
                                </div>
                            </div>
                        </div>
                        <div className="main-content-card">
                            {flightResultdata && flightResultdata.map((result, index) => (result.ticketPrice < maxrange && result.ticketPrice > minrange && (
                                <div key={index} className="content-card">
                                    <h6>Enjoy free meal</h6>
                                    <div className=" flexBet">
                                        <div className=" content-card-container flexBet">
                                            <div className="content-card-container-airline">
                                                <div className="flexXY">
                                                    <div>
                                                        <img src={getAirlineInfo(flightResultdata[0].flightID.slice(0, 2)).logoSrc} alt="Logo" />
                                                    </div>
                                                    <div className="content-card-container-airline-name">
                                                        <h5>{getAirlineInfo(result.flightID).airlineName}</h5>
                                                        <h6>{result.flightID.slice(0, 2)}-{result.flightID.slice(13, 16)}</h6>
                                                    </div>
                                                </div>
                                                <h4 onClick={() => handleFlightDetails(index)}>{flightDetails && selectedCardIndex === index ? 'Hide details' : 'Flight details'}</h4>
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
                                                    <h4>{result.stops === 0 && 'Non stop'}</h4>
                                                    <h4>{result.stops === 1 && '1 stop'}</h4>
                                                    <h4>{result.stops === 2 && '2 stop'}</h4>
                                                </div>
                                                <h3>{result.arrivalTime}</h3>
                                            </div>
                                        </div>
                                        <div className="content-card-price-book-container flexBet">
                                            <h3>₹{result.ticketPrice}</h3>
                                            <h2 onClick={() => {navigateToFlightInfo(result._id, result.flightID)}} className="content-card-book-btn">Book</h2>
                                        </div>
                                    </div>
                                    {flightDetails && selectedCardIndex === index && 
                                        <div className="content-card-flight-details">
                                            <div className="content-card-flight-details-header flexBet">
                                                <div className="content-card-header-head1 flexXY">
                                                    <h4>{result.source} <HiOutlineArrowNarrowRight /> {result.destination}</h4>
                                                    <p>{formatdatefrom}</p>
                                                </div>
                                                <div className="content-card-header-head2 flexXY">
                                                    <h6>Partially Refundable</h6>
                                                    <p>Know more</p>
                                                </div>
                                            </div>
                                            <div className="content-card-container-details-airline flexY g20">
                                                <div className="content-card-container-details-sec1 flexBet">
                                                    <div>
                                                        <img src={getAirlineInfo(result.flightID).logoSrc} />
                                                    </div>
                                                    <div className="content-card-container-airline-name">
                                                        <h5>{getAirlineInfo(result.flightID).airlineName}</h5>
                                                    </div>
                                                    <div className="flexC">
                                                        <h6>{result.flightID.slice(0, 2)}-{result.flightID.slice(13, 16)}</h6>
                                                        <h5>Economy</h5>
                                                    </div>
                                                </div>
                                                <div className="content-card-expanded flexBet">
                                                    <div className="content-card-expanded-sec1">
                                                        <div className="flexY g5"><h3>{result.source}</h3><h4>{result.departureTime}</h4></div>
                                                        <p>{formatdatefrom}</p>
                                                    </div>
                                                    <div className="content-card-expanded-sec2">
                                                        {clockIcon}
                                                        <p>{result.duration}h {result.duration}m</p>
                                                    </div>
                                                    <div className="content-card-expanded-sec3">
                                                        <div className="flexY g5"><h3>{result.destination}</h3><h4>{result.arrivalTime}</h4></div>
                                                        <p>{formatdatefrom}</p>
                                                    </div>
                                                    <div className="content-card-expanded-sec4">
                                                        <p>Check-in baggage</p>
                                                        <p>Cabin baggage</p>
                                                    </div>
                                                    <div className="content-card-expanded-sec5">
                                                        <p>15 kg / adult</p>
                                                        <p>7 kg / adult</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='paginationBtn flexXY g20'>
                <button className={` ${(pagination === 1) ? 'inactive' : 'btn'}`} onClick={() => setPagination(pagination - 1)} disabled={pagination == 1}>Prev</button>
                <h4>...{pagination}</h4>
                <button className={` ${(pagination === +resultforpagination / 20) ? 'inactive' : 'btn'}`} onClick={() => setPagination(pagination + 1)} disabled={+resultforpagination/20===pagination} >Next</button>
            </div>
            {/* {!loading && <span class="loader"></span>} */}
        </div>
    );
}
