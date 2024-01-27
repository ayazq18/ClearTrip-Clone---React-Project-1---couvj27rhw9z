import React, { useEffect, useState } from 'react';
import './HotelResults.css'
import { Base_URL, Project_ID, App_Type } from "../Constants";
import { calender, dropDown, hotelProfile, location, loginProfile, logo, IconClose, negative, positive, deals, guestrating, searchIcon } from '../Services/Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Signup from "../Signup/Signup.js";
import Login from "../Login/Login.js";
import { useAuthContext } from '../ContextAllData.js';
import { CgMathMinus, CgMathPlus } from 'react-icons/cg';
import { BiCheck } from "react-icons/bi";


const HotelNavBar = ({ inputResult, fromDate, toDate, hotelsResultData, setHotelResultData, setIsVisible, isVisible }) => {
    const { all, setall } = useAuthContext()
    const navigate = useNavigate()


    const [token, setToken] = useState(localStorage.getItem('token'))
    const [showSignup, setShowSignUp] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [inputValue, setInputValue] = useState(inputResult)
    const [adultcount, setAdultCount] = useState(1);
    const [childrencount, setChildrenCount] = useState(0);
    const [selectVisible, setSelectVisible] = useState(false);
    const [classs, setClasss] = useState("Guests");
    const [rotateCateg, setRotateCateg] = useState({ transform: "rotate(0deg)" });

    const [hotelResult, setHotelResult] = useState([])
    const [popUp, setPopUp] = useState(false)
    const [expandDestination, setExpandDestination] = useState(false)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [date1, setDate1] = useState(fromDate)
    const [date2, setDate2] = useState(toDate)

    const [hotelPrice, setHotelPrice] = useState(false)
    const [hotelDeal, setHotelDeal] = useState(false)
    const [guestRating, setGuestRating] = useState(false)
    const [price, setPrice] = useState(false)
    const [pop, setpop] = useState({})
    const [priceTag, setPriceTag] = useState('Price: High to Low')
    const [sortOrder, setSortOrder] = useState('highToLow')


    function popp(key) {
        setpop({});
        setpop((prev) => ({ ...prev, [key]: !pop[key] }))
    }

    const arr = [
        { category: "Adults", age: "(12+ Years)", count: 1 },
        { category: "Children", age: "(2 - 12 yrs)", count: 0 },
    ];

    const handleIncrease = (category) => {
        switch (category) {
            case "Adults": setAdultCount(adultcount + 1); break;
            case "Children": setChildrenCount(childrencount + 1); break;
            default: break;
        }
    };

    const handleDecrease = (category) => {
        switch (category) {
            case "Adults": adultcount > 1 && setAdultCount(adultcount - 1); break;
            case "Children": childrencount > 0 && setChildrenCount(childrencount - 1); break;
            default: break;
        }
    };

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

    const handleLoginSignUp = () => {
        token ? setShowLogin(!showLogin) : setShowSignUp(!showSignup);
    };

    const handleHotelInput = (selectedHotel) => {
        setInputValue(selectedHotel)
    }

    const [selectedCheckBox, setSelectedCheckBox] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const handleClick = (checkBox) => {
        setSelectedCheckBox(checkBox === selectedCheckBox ? null : checkBox)
        setDisabled(!disabled)
    }

    const [selectedDeals, setSelectedDeals] = useState([])
    const [dealsDisabled, setDealsDisabled] = useState(false)
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
            const sortParameter = sortOrder === 'highToLow' ? -1 : 1;
            const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${inputValue}"}&sort={"price":"${sortParameter}"}`, { method: "GET", headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJlZWE2ZWM3MjNmN2NkZTA0OTJmNSIsImlhdCI6MTcwNTkxNDQyMywiZXhwIjoxNzM3NDUwNDIzfQ.NsXu4O1WNOfj__A2bSWNhgoazcYlUFMaWeMDp_fPTow', projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json()
            setHotelResult(result.data.hotels)
            setIsVisible(!isVisible)
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchHotels()
        setIsVisible(false)
    }, [inputValue, sortOrder])

    return (
        <div className='hotelResults'>
            <div className='hotelResults-navBar-container flexY'>
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
                    <div className='hotelResults-navBar-btnDiv flexXY' onClick={() => { handleLoginSignUp(); popp('login') }}>
                        {token && <div>{loginProfile}</div>}
                        <h4 className={`hotelResults-navBar-btnDiv-loginbtn ${token ? 'loggedIn' : ''}`}>{token ? <>Hi, User {dropDown}</> : 'Login / Signup'}</h4>
                        {showSignup && <div className='hotelLogin-transparent' onClick={() => pop['login']}></div>}
                        <div className='hotelResults-signup'>
                            {showSignup && <Signup token={token} setToken={setToken} showSignup={showSignup} setShowSignUp={setShowSignUp} />
                            }
                        </div>
                    </div>
                </div>
                {showLogin && <div className='hotelLogin-transparent' onClick={() => handleLoginSignUp()}></div>}
                {showLogin &&
                    <div className='hotelResults-login'>
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
                            <button onClick={() => handleToSearch()}>Update</button>
                        </div>
                    </div>
                }
                {popUp && <div className='backg-transparent' onClick={() => setPopUp(false)}></div>}

                <div className='hotelFilter-container flexBet'>
                    <div className={`hotelFilter-sec1 ${pop["hotelprice"] ? 'searchActive' : ''} `}>
                        <div onClick={() => popp("hotelprice")} className='sortByPrice flexXY'><div>Sort by: {priceTag}</div><div className={`${pop['hotelprice'] && 'rotate'}`}>{dropDown}</div></div>
                        {pop["hotelprice"] &&
                            <div className={`hotelFilter-sec1-expand ${pop["hotelprice"] ? 'popup' : ''}`}>
                                <h2>Sort hotels by</h2>
                                <div className='hotelFilter-sec1-expand-container flex'>
                                    <div className='hotelFilter-sec1-expand-container-item flexY' onClick={() => handleClick('highPrice')}>
                                        <div className={`outerCircle ${selectedCheckBox === 'highPrice' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p onClick={() => { handlePriceTag('highPrice')}}>High to Low</p>
                                    </div>
                                    <div className='hotelFilter-sec1-expand-container-item flexY' onClick={() => handleClick('lowPrice')}>
                                        <div className={`outerCircle ${selectedCheckBox === 'lowPrice' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p onClick={() => { handlePriceTag('lowPrice') }}> Low to High</p>
                                    </div>
                                </div>
                                <div className='hotelFilter-sec1-expand-container-btn flex'><button onClick={() => { popp("hotelprice"); fetchHotels() }} className={`hotelFilter-sec1-expand-container-button ${selectedCheckBox !== null ? 'btnClick' : ''}`} disabled={selectedCheckBox === null && !disabled}>Apply</button></div>
                            </div>
                        }
                    </div>
                    {pop['hotelprice'] && <div className='hotelFilterbackg-transparent' onClick={() => popp()}></div>}
                    <div className={`hotelFilter-sec2 ${pop["deals"] ? 'searchActive' : ''} `}>
                        <div className='sortByDeals flexXY' onClick={() => popp("deals")}><div>{deals}</div><div>Deals</div><div className={`${pop['deals'] && 'rotate'}`}>{dropDown}</div></div>
                        {pop["deals"] &&
                            <div className={`hotelFilter-sec2-expand ${pop["deals"] ? 'popup' : ''}`}>
                                <h2>Deals</h2>
                                <div className='hotelFilter-sec2-expand-container flex'>
                                    <div className='hotelFilter-sec2-expand-container-item flexY' onClick={() => handleDeals('dealsOfDay')}>
                                        <div className={`outerSquare ${selectedDeals.includes('dealsOfDay') ? "hotelDeals-checked" : ""}`} ><div className={`${selectedDeals.includes('dealsOfDay') ? "checkedDeals" : ""}`}>{selectedDeals.includes('dealsOfDay') ? <BiCheck /> : ""}</div></div>
                                        <p>Deals of the day</p>
                                    </div>
                                    <div className='hotelFilter-sec2-expand-container-item flexY' onClick={() => handleDeals('jackPot')}>
                                        <div className={`outerSquare ${selectedDeals.includes('jackPot') ? "hotelDeals-checked" : ""}`} ><div className={`${selectedDeals.includes('jackPot') ? "checkedDeals" : ""}`}>{selectedDeals.includes('jackPot') ? <BiCheck /> : ""}</div></div>
                                        <p>Jackpot deals</p>
                                    </div>
                                    <div className='hotelFilter-sec2-expand-container-item flexY' onClick={() => handleDeals('bestSeller')}>
                                        <div className={`outerSquare ${selectedDeals.includes('bestSeller') ? "hotelDeals-checked" : ""}`} ><div className={`${selectedDeals.includes('bestSeller') ? "checkedDeals" : ""}`}>{selectedDeals.includes('bestSeller') ? <BiCheck /> : ""}</div></div>
                                        <p>BestSeller hotels</p>
                                    </div>
                                    <div className='hotelFilter-sec2-expand-container-item flexY' onClick={() => handleDeals('premium')}>
                                        <div className={`outerSquare ${selectedDeals.includes('premium') ? "hotelDeals-checked" : ""}`} ><div className={`${selectedDeals.includes('premium') ? "checkedDeals" : ""}`}>{selectedDeals.includes('premium') ? <BiCheck /> : ""}</div></div>
                                        <p>Premium hotels</p>
                                    </div>
                                </div>
                                <div className='hotelFilter-sec2-expand-container-btn flex'><button onClick={() => popp("deals")} className={`hotelFilter-sec2-expand-container-button ${selectedDeals.length > 0 ? 'dealsBtnClick' : ''}`} disabled={selectedDeals.includes([]) ? !dealsDisabled : dealsDisabled}>Apply</button></div>
                            </div>
                        }
                    </div>
                    {pop['deals'] && <div className='hotelFilterbackg-transparent' onClick={() => popp()}></div>}

                    <div className={`hotelFilter-sec3 ${pop["guestrating"] ? 'searchActive' : ''} `}>
                        <div className='sortByGuest flexXY' onClick={() => popp("guestrating")}><div>{guestrating}</div><div>Guests Rating</div><div className={`${pop['guestrating'] && 'rotate'}`}>{dropDown}</div></div>
                        {pop["guestrating"] &&
                            <div className={`hotelFilter-sec3-expand ${pop["guestrating"] ? 'popup' : ''}`}>
                                <h2>Guests Rating</h2>
                                <div className='hotelFilter-sec3-expand-container flex'>
                                    <div className='hotelFilter-sec3-expand-container-item flexY' onClick={() => handleClick('higher')}>
                                        <div className={`outerCircle ${selectedCheckBox === 'higher' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p>4.5 & above</p>
                                    </div>
                                    <div className='hotelFilter-sec3-expand-container-item flexY' onClick={() => handleClick('average')}>
                                        <div className={`outerCircle ${selectedCheckBox === 'average' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p>4 & above</p>
                                    </div>
                                    <div className='hotelFilter-sec3-expand-container-item flexY' onClick={() => handleClick('low')}>
                                        <div className={`outerCircle ${selectedCheckBox === 'low' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p>3.5 & above</p>
                                    </div>
                                    <div className='hotelFilter-sec3-expand-container-item flexY' onClick={() => handleClick('lowest')}>
                                        <div className={`outerCircle ${selectedCheckBox === 'lowest' ? "hotelPrice-checked" : ""}`} ><div className='innerCircle'></div></div>
                                        <p>3 & above</p>
                                    </div>
                                </div>
                                <div className='hotelFilter-sec3-expand-container-btn flex'><button onClick={() => popp("guestrating")} className={`hotelFilter-sec3-expand-container-button ${selectedCheckBox !== null ? 'btnClick' : ''}`} disabled={!disabled}>Apply</button></div>
                            </div>
                        }
                    </div>
                    {pop['guestrating'] && <div className='hotelFilterbackg-transparent' onClick={() => popp()}></div>}

                    <div className={`hotelFilter-sec4 ${pop["price"] ? 'searchActive' : ''} `}>
                        <div className='sortByPrice flexXY' onClick={() => popp("price")}><div>{deals}</div><div>Price</div><div className={`${pop['price'] && 'rotate'}`}>{dropDown}</div></div>
                        {pop["price"] &&
                            <div className={`hotelFilter-sec4-expand ${pop["price"] ? 'popup' : ''}`}>
                                <h2>Price (per night)</h2>
                                <div className='hotelFilter-sec4-expand-container flex'>

                                </div>
                                <div className='hotelFilter-sec4-expand-container-btn flex'><h4 onClick={() => { popp("price") }}>Apply</h4></div>
                            </div>
                        }
                    </div>
                    {pop['price'] && <div className='hotelFilterbackg-transparent' onClick={() => popp()}></div>}

                    <div className='hotelSearch flexY' onClick={() => popp('searchHotel')}><div>{searchIcon}</div><input className='hotelSearchBar' placeholder='Taj Hotel' type='text' />
                        {pop['searchHotel'] &&
                            <div className={`hotelSearchBar-expand ${pop['searchHotel'] ? 'popup' : ''}`} onClick={() => popp("destination")}>
                                {hotelResult && hotelResult.map((hotel, index) => (
                                    <div key={index} className="hotelInputExpand-content flex">
                                        <h2>{location}</h2>
                                        <h1 onClick={() => handleHotelInput(hotel.name)}>{hotel.name}</h1>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    {pop['searchHotel'] && <div className='hotelFilterbackg-transparent' onClick={() => popp()}></div>}
                </div>
            </div>
            {!isVisible && <span class="loader"></span>}
        </div>
    );
}

export default HotelNavBar;
