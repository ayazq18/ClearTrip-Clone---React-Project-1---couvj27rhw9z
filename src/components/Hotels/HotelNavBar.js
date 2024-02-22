import React, { useEffect, useState } from 'react';
import './HotelResults.css'
import { Base_URL, Project_ID, App_Type, handleselectionCategory } from "../Constants";
import { calender, dropDown, hotelProfile, location, loginProfile, logo, IconClose, negative, positive, deals, guestrating, searchIcon } from '../../Services/Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Signup from "../Signup/Signup.js";
import Login from "../Login/Login.js";
import { useAuthContext } from '../ContextAllData.js';
import MultiRangeSlider from "multi-range-slider-react";
import { CgMathMinus, CgMathPlus } from 'react-icons/cg';
import { BiCheck } from "react-icons/bi";


const HotelNavBar = ({lowhigh,setlowhigh, minrange, setminrange, maxrange, setmaxrange, rating, setrating, inputResult, fromDate, toDate }) => {
    const { all, setall } = useAuthContext()
    const navigate = useNavigate()


    const [token, setToken] = useState(localStorage.getItem('token'))
    const [showSignup, setShowSignUp] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [inputValue, setInputValue] = useState(inputResult)
    const [selectVisible, setSelectVisible] = useState(false);
    const [classs, setClasss] = useState("Guests");
    const [rotateCateg, setRotateCateg] = useState({ transform: "rotate(0deg)" });
    const [selectedCheckBox, setSelectedCheckBox] = useState();

    const [hotelResult, setHotelResult] = useState([])
    const [popUp, setPopUp] = useState(false)
    const [expandDestination, setExpandDestination] = useState(false)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [date1, setDate1] = useState(fromDate)
    const [date2, setDate2] = useState(toDate)
    const [selectedDeals, setSelectedDeals] = useState([])
    const [dealsDisabled, setDealsDisabled] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const [hotelPrice, setHotelPrice] = useState(false)
    const [hotelDeal, setHotelDeal] = useState(false)
    const [guestRating, setGuestRating] = useState(false)
    const [pop, setpop] = useState({})
    const {infantcount, setinfantCount, childrencount, setChildrenCount, adultcount, setAdultCount, handleIncrease, handleDecrease} = handleselectionCategory()


    function ratingchanger(val) {
        if (val == rating) {
            setrating("1")
        }
        else {
            setrating(val);
        }
    }
    function lowhighchanger(val){
        if (val == lowhigh) {
            setlowhigh("")
        }
        else {
            setlowhigh(val);
        }
    }

    function popp(key) {
        setpop({});
        setpop((prev) => ({ ...prev, [key]: !pop[key] }))
    }

    const arr = [
        { category: "Adult", age: "(12+ Years)", count: 1 },
        { category: "Children", age: "(2 - 12 yrs)", count: 0 },
    ];

    const handleSelectCategory = () => {
        setSelectVisible(!selectVisible);
        setRotateCateg(
            selectVisible
                ? { transform: "rotate(0deg)", transition: 'transform 0.2s ease-in-out', }
                : { transform: "rotate(180deg)", transition: 'transform 0.2s ease-in-out', }
        );
    }

    const handlePopUpNav = (type) => {
        setPopUp((prev) => !prev)
        switch (type) {
            case 'destination': setExpandDestination(expandDestination); setStartDate(false); setShowLogin(false); setHotelPrice(false); setHotelDeal(false); setHotelPrice(false); setGuestRating(false); break;
            case 'date1': setStartDate(!startDate); setExpandDestination(false); setShowLogin(false); setHotelPrice(false); setHotelDeal(false); setHotelPrice(false); setGuestRating(false); break
            case 'date2': setStartDate(!endDate); setStartDate(false); setExpandDestination(false); setShowLogin(false); setHotelPrice(false); setHotelDeal(false); setHotelPrice(false); setGuestRating(false); break
            case 'selectCategory': setSelectVisible(!selectVisible); setStartDate(false); setEndDate(false); setExpandDestination(false); setShowLogin(false); setHotelPrice(false); setHotelDeal(false); setHotelPrice(false); setGuestRating(false); break
            default: break
        }
    }

    const handleToSearch = () => {
        fetchHotels()
        setPopUp(false)
        navigate(`/hotels/results?location=${inputValue}&dateFrom=${date1}&dateTo=${date2}`)
    }

    const handleLoginSignUp = (e) => {
        if(token){
            setShowLogin(!showLogin)
        }else{
            setShowSignUp(!showSignup)
        }
    };

    const handleHotelInput = (selectedHotel) => {
        setInputValue(selectedHotel)
    }

    const handleClick = (checkBox) => {
        setSelectedCheckBox(checkBox === selectedCheckBox ? null : checkBox)
        setDisabled(!disabled)
    }

    const handleDeals = (checkBox) => {
        const updatedCheckBoxes = [...selectedDeals]
        if (updatedCheckBoxes.includes(checkBox)) {
            updatedCheckBoxes.splice(updatedCheckBoxes.indexOf(checkBox), 1)
        } else {
            updatedCheckBoxes.push(checkBox)
        }
        setSelectedDeals(updatedCheckBoxes)
        setDealsDisabled(updatedCheckBoxes.length === 0)

    }

    const fetchHotels = async () => {
        try {
            const response = await fetch(`${Base_URL}/hotel?search={"location":"${inputValue}"}`, { method: "GET", headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJlZWE2ZWM3MjNmN2NkZTA0OTJmNSIsImlhdCI6MTcwNTkxNDQyMywiZXhwIjoxNzM3NDUwNDIzfQ.NsXu4O1WNOfj__A2bSWNhgoazcYlUFMaWeMDp_fPTow', projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json()
            setHotelResult(result.data.hotels)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchHotels()
    }, [inputValue])


    return (
        <div className='hotelResults'>
            <div className='hotelResults-navBar-container flexXY'>
                <div className='hotelResults-navBar flexBet'>
                    <div onClick={() => navigate('/hotel')}>{logo}</div>
                    <div className='hotelResults-input flexXY' >
                        <div className='hotelResults-input-destresult flexY' onClick={() => handlePopUpNav('destination')}>
                            <div>{location}</div>
                            <p>{inputValue}</p>
                        </div>
                        <div className='hotelResults-input-dateResult flexXY' type='date'>
                            <div className='flexXY'>
                                {calender}
                                <p id='hotelResults-input-dateResult-date1' onClick={() => handlePopUpNav('date1')}>{date1}</p>
                                <p onClick={() => handlePopUpNav('date2')}>{date2}</p>
                            </div>
                        </div>
                        <div onClick={() => handlePopUpNav('selectCategory')} className="hotelResults-input-selectCategResult flexBet">
                            {hotelProfile} &nbsp;
                            <p>1 Room, {adultcount} Guests</p>
                        </div>
                    </div>
                    <div className='hotelResults-navBar-btnDiv flexXY' onClick={(e) => { handleLoginSignUp(e)}}>
                        {token && <div>{loginProfile}</div>}
                        <h4 className={`hotelResults-navBar-btnDiv-loginbtn point ${token ? 'loggedIn' : ''}`}>{token ? <>{JSON.parse(localStorage.getItem('name'))} {dropDown}</> : 'Login / Signup'}</h4>
                        {showSignup && <div className='hotelLogin-transparent'></div>}
                    </div>
                        <div className='hotelResults-signup'>
                            {showSignup && <Signup token={token} setToken={setToken} showSignup={showSignup} setShowSignUp={setShowSignUp} />}
                        </div>
                </div>
                {showLogin && <div className='hotelLogin-transparent' onClick={()=>setShowLogin(false)}></div>}
                {showLogin &&
                    <div className='hotelResults-login popup'>
                        <Login token={token} setToken={setToken} showLogin={showLogin} setShowLogin={setShowLogin} showSignup={showSignup} setShowSignUp={setShowSignUp} />
                    </div>
                }
                {popUp &&
                    <div className={`hotelResults-input-expand ${popUp ? 'popup' : ""} flexXY`}>
                        <div className='hotelResults-input flexXY'>
                            <div className={`hoteldynamicDiv flexXY ${pop['destination'] ? 'searchActive' : ''}`}>
                                <div className="hotelLocation-icon flexXY">{location}</div>
                                <input className='hotelResults-input-dest' placeholder='Search destination' onClick={() => popp("destination")} type='text' value={inputValue} onChange={(e) => { setInputValue(e.target.value); fetchHotels(e.target.value) }} />
                                <div id='iconClose' onClick={() => setInputValue('')}>{IconClose}</div>
                                {pop["destination"] &&
                                    <div className='hoteldynamicDiv-expand' onClick={() => popp("destination")}>
                                        {hotelResult && hotelResult.map((hotel, index) => (
                                            <div key={index} className="hotelInputExpand-content flex">
                                                <h2>{location}</h2>
                                                <h1 onClick={() => handleHotelInput(hotel.location)}>{hotel.location}</h1>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                            {popUp && <input min={new Date().toISOString().split('T')[0]} className={`hotelResults-input-date fromdate ${pop['startdate'] ? 'searchActive' : ''}`} value={date1} onChange={(e) => setDate1(e.target.value)} onClick={() => popp("startdate")} type='date' />}
                            <input min={new Date().toISOString().split('T')[0]} className={`hotelResults-input-date todate ${pop['enddate'] ? 'searchActive' : ''}`} value={date2} onChange={(e) => setDate2(e.target.value)} onClick={() => popp("enddate")} type='date' />
                            <div className={`hotelResults-input-selectCateg flexBet ${pop['hotelSearch'] ? 'searchActive' : ''}`} onClick={() => { handleSelectCategory(); popp('hotelSearch') }}>
                                {hotelProfile} &nbsp;
                                <p>
                                    <span>1 Room,</span>
                                    {adultcount && (<>{adultcount}</>)}
                                </p> &nbsp;
                                <p>{classs}</p> &nbsp;
                                <div style={rotateCateg} >{dropDown}</div>
                                {pop['hotelSearch'] && (
                                    <div className="hotelSelectCateg-Expand">
                                        <div className="hotelSelectCateg-Expand-header flexBet">
                                            <h5>Room 1</h5>
                                        </div>
                                        {arr.map((items, index) => (
                                            <div className="hotelSelectCateg-Expand-container flexBet">
                                                <div>
                                                    <h1>{items.category}</h1>
                                                    <h5>{items.age}</h5>
                                                </div>
                                                <div className="hotelSelectCateg-count flexY">
                                                    <CgMathMinus
                                                        className={`${(items.category === "Adults" && adultcount > 1) ||
                                                            (items.category === "Children" && childrencount > 0)
                                                            ? "hotelChangeToPosIcon"
                                                            : "hotelCountNegIcon"
                                                            }`}
                                                        onClick={() => handleDecrease(items.category)}
                                                    />
                                                    <h1>
                                                        {items.category === "Adults"
                                                            ? adultcount
                                                            : childrencount}
                                                    </h1>
                                                    <CgMathPlus
                                                        className="hotelChangeToPosIcon"
                                                        onClick={() => handleIncrease(items.category)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <div className="hotelAddAnother flexY" onClick={() => pop('hotelSearch')}>
                                            <CgMathPlus />
                                            <span>Add another room</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button className='point' onClick={() => handleToSearch()}>Update</button>
                        </div>
                    </div>
                }
                {popUp && <div className='backg-transparent' onClick={() => setPopUp(false)}></div>}

                <div className='hotelFilter-container flexBet'>
                    <div className={`hotelFilter-sec1 ${pop["hotelprice"] ? 'searchActive' : ''} `}>
                        <div onClick={() => popp("hotelprice")} className='sortByPrice flexXY'><div>Sort by: Price: {!lowhigh ? 'High to Low' : 'Low to high'}</div><div className={`${pop['hotelprice'] && 'rotate'}`}>{dropDown}</div></div>
                        {pop["hotelprice"] &&
                            <div className={`hotelFilter-sec1-expand ${pop["hotelprice"] ? 'popup' : ''}`}>
                                <h2>Sort hotels by</h2>
                                <div className='hotelFilter-sec1-expand-container flex'>
                                    <div className='hotelFilter-sec1-expand-container-item flexY' onClick={() => {handleClick('highPrice'); popp('hotprice')}}>
                                        <div className={`outerCircle ${selectedCheckBox === 'highPrice' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p onClick={() => {lowhighchanger("hightolow")}}>High to Low</p>
                                    </div>
                                    <div className='hotelFilter-sec1-expand-container-item flexY' onClick={() => {handleClick('lowPrice'); popp('hotprice')}}>
                                        <div className={`outerCircle ${selectedCheckBox === 'lowPrice' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p onClick={() => {lowhighchanger("lowtohigh")}}> Low to High</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    {pop['hotelprice'] && <div className='hotelFilterbackg-transparent' onClick={() => popp()}></div>}
                    {/* <div className={`hotelFilter-sec2 ${pop["star"] ? 'searchActive' : ''} `}>
                        <div className='sortByDeals flexXY' onClick={() => popp("star")}><div>{deals}</div><div>Star category</div><div className={`${pop['star'] && 'rotate'}`}>{dropDown}</div></div>
                        {pop["star"] &&
                            <div className={`hotelFilter-sec2-expand ${pop["star"] ? 'popup' : ''}`}>
                                <h2>Star Category</h2>
                                <div className='hotelFilter-sec2-expand-container flex'>
                                    <div className='hotelFilter-sec2-expand-container-item flexY' onClick={() => handleDeals('dealsOfDay')}>
                                        <div className={`outerSquare ${selectedDeals.includes('dealsOfDay') ? "hotelDeals-checked" : ""}`} ><div className={`${selectedDeals.includes('dealsOfDay') ? "checkedDeals" : ""}`}>{selectedDeals.includes('dealsOfDay') ? <BiCheck /> : ""}</div></div>
                                        <p>5 star</p>
                                    </div>
                                    <div className='hotelFilter-sec2-expand-container-item flexY' onClick={() => handleDeals('jackPot')}>
                                        <div className={`outerSquare ${selectedDeals.includes('jackPot') ? "hotelDeals-checked" : ""}`} ><div className={`${selectedDeals.includes('jackPot') ? "checkedDeals" : ""}`}>{selectedDeals.includes('jackPot') ? <BiCheck /> : ""}</div></div>
                                        <p>4 star</p>
                                    </div>
                                    <div className='hotelFilter-sec2-expand-container-item flexY' onClick={() => handleDeals('bestSeller')}>
                                        <div className={`outerSquare ${selectedDeals.includes('bestSeller') ? "hotelDeals-checked" : ""}`} ><div className={`${selectedDeals.includes('bestSeller') ? "checkedDeals" : ""}`}>{selectedDeals.includes('bestSeller') ? <BiCheck /> : ""}</div></div>
                                        <p>3 star</p>
                                    </div>
                                    <div className='hotelFilter-sec2-expand-container-item flexY' onClick={() => handleDeals('premium')}>
                                        <div className={`outerSquare ${selectedDeals.includes('premium') ? "hotelDeals-checked" : ""}`} ><div className={`${selectedDeals.includes('premium') ? "checkedDeals" : ""}`}>{selectedDeals.includes('premium') ? <BiCheck /> : ""}</div></div>
                                        <p>2 star</p>
                                    </div>
                                </div>
                                <div className='hotelFilter-sec2-expand-container-btn flex'><button onClick={() => popp("star")} className={`hotelFilter-sec2-expand-container-button point ${selectedDeals.length > 0 ? 'dealsBtnClick' : ''}`} disabled={selectedDeals.includes([]) ? !dealsDisabled : dealsDisabled}>Apply</button></div>
                            </div>
                        }
                    </div>
                    {pop['star'] && <div className='hotelFilterbackg-transparent' onClick={() => popp()}></div>} */}

                    <div className={`hotelFilter-sec3 ${pop["guestrating"] ? 'searchActive' : ''} `}>
                        <div className='sortByGuest flexXY' onClick={() => popp("guestrating")}><div>{guestrating}</div><div>Guests Rating</div><div className={`${pop['guestrating'] && 'rotate'}`}>{dropDown}</div></div>
                        {pop["guestrating"] &&
                            <div className={`hotelFilter-sec3-expand ${pop["guestrating"] ? 'popup' : ''}`}>
                                <h2>Guests Rating</h2>
                                <div className='hotelFilter-sec3-expand-container flex'>
                                    <div className='hotelFilter-sec3-expand-container-item flexY' onClick={() => { ratingchanger("4.5"); handleClick('higher'); popp('rate') }}>
                                        <div className={`outerCircle ${selectedCheckBox === 'higher' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p>4.5 & above</p>
                                    </div>
                                    <div className='hotelFilter-sec3-expand-container-item flexY' onClick={() => { ratingchanger("4"); handleClick('average'); popp('rate') }}>
                                        <div className={`outerCircle ${selectedCheckBox === 'average' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p>4 & above</p>
                                    </div>
                                    <div className='hotelFilter-sec3-expand-container-item flexY' onClick={() => { ratingchanger("3.5"); handleClick('low'); popp('rate') }}>
                                        <div className={`outerCircle ${selectedCheckBox === 'low' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p>3.5 & above</p>
                                    </div>
                                    <div className='hotelFilter-sec3-expand-container-item flexY' onClick={() => { ratingchanger("3"); handleClick('lowest'); popp('rate') }}>
                                        <div className={`outerCircle ${selectedCheckBox === 'lowest' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p>3 & above</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    {pop['guestrating'] && <div className='hotelFilterbackg-transparent' onClick={() => popp()}></div>}

                    <div className={`hotelFilter-sec4 ${pop["price"] ? 'searchActive' : ''} `}>
                        <div className='sortByPrice flexXY' onClick={() => popp("price")}><div>{deals}</div><div>Price</div><div className={`${pop['price'] && 'rotate'}`}>{dropDown}</div></div>
                        {pop["price"] &&
                            <div className={`hotelFilter-sec4-expand ${pop["price"] ? 'popup' : ''}`}>
                                <h2>Price (per night)</h2>
                                <MultiRangeSlider min={1000} max={10000} minValue={minrange} ruler="false" label="false" maxValue={maxrange} step={1} onInput={(e) => { setminrange(e.minValue); setmaxrange(e.maxValue) }} />
                            </div>
                        }
                    </div>
                    {pop['price'] && <div className='hotelFilterbackg-transparent' onClick={() => popp()}></div>}
                    {pop['searchHotel'] && <div className='hotelFilterbackg-transparent' onClick={() => popp()}></div>}
                </div>
            </div>
        </div>
    );
}

export default HotelNavBar;
