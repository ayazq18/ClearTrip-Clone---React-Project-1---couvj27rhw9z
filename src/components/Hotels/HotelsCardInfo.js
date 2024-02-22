import React, { Suspense, useEffect, useMemo, useState, lazy, useRef } from 'react';
import './HotelCardInfo.css'
import { Base_URL, Project_ID, App_Type, handleselectionCategory } from "../Constants";
import { calender, dropDown, hotelProfile, location, loginProfile, logo, IconClose, negative, positive, deals, guestrating, searchIcon, ratingCircle, ratingOwl, rightArrow, hotelIcon } from '../../Services/Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../ContextAllData.js';
import { CgMathMinus, CgMathPlus } from 'react-icons/cg';
import { GiHotMeal } from "react-icons/gi";
const InfoCarausal = lazy(() => import('../Corousel/HotelPage/InfoCarausal.js'));
import { GiGymBag } from "react-icons/gi";
import { MdRestaurant, MdTableBar, MdOutlineSignalWifi4Bar } from "react-icons/md";
import { FaPersonSwimming, FaSprayCanSparkles } from "react-icons/fa6";
import { MdOutlineFreeCancellation, MdOutlineVerified } from "react-icons/md";
import { RxInfoCircled } from "react-icons/rx";
import Footer from '../Footer.js';


const HotelsCardInfo = ({ inputResult, fromDate, toDate }) => {
    const { all, setall } = useAuthContext()
    const hotelCardInfoLocation = useLocation();
    const searchParams = new URLSearchParams(hotelCardInfoLocation.search);
    let hotelId = searchParams.get("hotelId");
    let dateFrom = searchParams.get("dateFrom")
    let dateTo = searchParams.get("dateTo")
    let hoteLocation = searchParams.get('location')
    const navigate = useNavigate()


    const [inputValue, setInputValue] = useState(hoteLocation)
    const [classs, setClasss] = useState("Guests");
    const [selectVisible, setSelectVisible] = useState(false);
    const [rotateCateg, setRotateCateg] = useState({ transform: "rotate(0deg)" });
    const [load, setLoad] = useState(false)
    const [hotelResultLocation, setHotelResultLocation] = useState([])
    const [hotelInfoResult, setHotelInfoResult] = useState([])
    const [popUp, setPopUp] = useState(false)
    const [date1, setDate1] = useState(dateFrom)
    const [date2, setDate2] = useState(dateTo)
    const [activetab, setactivetab] = useState({ 'gen': true, 'amenities': false, 'rooms': false })

    const [pop, setpop] = useState({})
    const [poptab, setpoptab] = useState({})
    const [showPriceSec, setShowPriceSec] = useState(false)
    const { infantcount, setinfantCount, childrencount, setChildrenCount, adultcount, setAdultCount, handleIncrease, handleDecrease } = handleselectionCategory()


    function popp(key) {
        setpop({});
        setpop((prev) => ({ ...prev, [key]: !pop[key] }))
    }
    function popUpTab(key) {
        setPopUp((prev) => !prev)
        setpoptab({});
        setpoptab((prev) => ({ ...prev, [key]: !poptab[key] }))
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

    const handleToSearch = () => {
        fetchHotelLocation()
        setPopUp(false)
        inputValue && date1 && date2 && navigate(`/hotels/results?location=${inputValue}&dateFrom=${date1}&dateTo=${date2}`)
    }

    const handleHotelInput = (selectedHotel) => {
        setInputValue(selectedHotel)
    }

    const handlePriceSecPopup = () => {
        setShowPriceSec(!showPriceSec)
    }

    const fetchHotelLocation = async () => {
        try {
            const response = await fetch(`${Base_URL}/hotel?search={"location":"${inputValue}"}`, { method: "GET", headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJlZWE2ZWM3MjNmN2NkZTA0OTJmNSIsImlhdCI6MTcwNTkxNDQyMywiZXhwIjoxNzM3NDUwNDIzfQ.NsXu4O1WNOfj__A2bSWNhgoazcYlUFMaWeMDp_fPTow', projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json()
            setHotelResultLocation(result.data.hotels)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchHotelLocation()
    }, [inputValue])


    const fetchHotelCardInfo = useMemo(async () => {
        try {
            setLoad(false)
            const response = await fetch(`${Base_URL}/hotel/${hotelId}`, { method: "GET", headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJlZWE2ZWM3MjNmN2NkZTA0OTJmNSIsImlhdCI6MTcwNTkxNDQyMywiZXhwIjoxNzM3NDUwNDIzfQ.NsXu4O1WNOfj__A2bSWNhgoazcYlUFMaWeMDp_fPTow', projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json()
            setHotelInfoResult(result.data)
            setLoad(true)
        } catch (error) {
            console.log(error);
        }
    }, [hotelId])


    const mouseLocation = () => {
        window.addEventListener('scroll', (e) => {
            const scrolly = window.scrollY
            if (scrolly >= 530) { setShowPriceSec(!showPriceSec); setactivetab({ 'rooms': true }) }
            else if (scrolly >= 150) { setShowPriceSec(false); setactivetab({ 'rooms': false }); setactivetab({ 'amenities': true }) }
            else if (scrolly < 235) { setactivetab({ 'amenities': false }); setactivetab({ 'gen': true }) } else { setactivetab({ 'gen': false }) }
        })
    }

    useEffect(() => {
        mouseLocation()
        fetchHotelCardInfo
    }, [])

    const handleToPayment = () => {
        navigate(`/hotels/results/hotelcardsinfo/hotelBooking?hotelId=${hotelId}&dateFrom=${date1}&dateTo=${date2}`)
    }

    return (
        <>
            {load && <div className='hotelCardInfo'>
                <div className='flexX'>
                    <div className='hotelResults-navBar-container flexXY'>
                        <div className='hotelResults-navBar flexBet'>
                            <div id='hotelLogo' onClick={() => navigate('/hotel')}>{logo}</div>
                            <div className='hotelResults-input flexXY' >
                                <div className='hotelResults-input-destresult flexY' onClick={() => popUpTab('dest')}>
                                    <div>{hoteLocation}</div>
                                </div>
                                <div className='hotelResults-input-dateResult flexXY' type='date'>
                                    <div className='flexXY'>
                                        {calender}
                                        <p id='hotelResults-input-dateResult-date1' onClick={() => popUpTab('date1')}>{dateFrom}</p>
                                        <p onClick={() => popUpTab('date2')}>{dateTo}</p>
                                    </div>
                                </div>
                                <div onClick={() => popUpTab('selectCategory')} className="hotelResults-input-selectCategResult flexBet">
                                    {hotelProfile} &nbsp;
                                    <p>1 Room, {adultcount} Guests</p>
                                </div>
                            </div>
                        </div>
                        {popUp &&
                            <div className={`hotelResults-input-expand ${popUp ? 'popup' : ""} flexXY`}>
                                <div className='hotelResults-input flexXY'>
                                    <div className={`hoteldynamicDiv flexXY ${pop['destination'] ? 'searchActive' : ''}`}>
                                        <div className="hotelLocation-icon flexXY">{location}</div>
                                        <input className='hotelResults-input-dest' placeholder='Search destination' onClick={() => popp("destination")} type='text' value={inputValue} onChange={(e) => { setInputValue(e.target.value); fetchHotelLocation(e.target.value) }} />
                                        <div id='iconClose' onClick={() => setInputValue('')}>{IconClose}</div>
                                        {pop["destination"] &&
                                            <div className='hoteldynamicDiv-expand' onClick={() => popp("dest")}>
                                                {hotelResultLocation && hotelResultLocation.map((hotel, index) => (
                                                    <div key={index} className="hotelInputExpand-content flex">
                                                        <h2>{location}</h2>
                                                        <h1 onClick={() => handleHotelInput(hotel.location)}>{hotel.name}</h1>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    {popUp && <input min={new Date().toISOString().split('T')[0]} className={`hotelResults-input-date fromdate ${poptab['date1'] ? 'searchActive' : ''}`} value={date1} onChange={(e) => setDate1(e.target.value)} onClick={() => popp("startdate")} type='date' />}
                                    {popUp && <input min={new Date().toISOString().split('T')[0]} className={`hotelResults-input-date todate ${poptab['date2'] ? 'searchActive' : ''}`} value={date2} onChange={(e) => setDate2(e.target.value)} onClick={() => popp("enddate")} type='date' />}
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
                        <div className='hotelCardInfo-container-tab flexBet'>
                            <div className='hotelCardInfo-container-tab-section flex'>
                                <a href='#general' className={activetab['gen'] ? 'activeTab' : ''} onClick={() => { popp('general') }}>General</a>
                                <a href='#amenities' className={activetab['amenities'] ? 'activeTab' : ''} onClick={() => { popp('amenities') }}>Amenities</a>
                                <a href='#room' className={activetab['rooms'] ? 'activeTab' : ''} onClick={() => { popp('room') }}>Rooms</a>
                            </div>
                            {showPriceSec &&
                                <div className=' hotelPricingSec flexBet g10'>
                                    <div className='hotelPricingSec1 flexXY'>
                                        <div className='hotelPricingSec-container flexXY g10'>
                                            <p className='con2'>+ ₹{(((hotelInfoResult.avgCostPerNight * 18) / 100)).toString().match(/^(\d+)(?=\.)/) ? (((hotelInfoResult.avgCostPerNight * 18) / 100)).toString().match(/^(\d+)(?=\.)/)[0] : ((hotelInfoResult.avgCostPerNight * 18) / 100)}</p>
                                            <p className='con1'>₹{Math.floor(hotelInfoResult.avgCostPerNight).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1,')}</p>
                                            <p className='con3'>/ night</p>
                                            <del className='con4'>{Math.floor((hotelInfoResult.avgCostPerNight * 18) / 100).toString()} tax</del>
                                        </div>
                                    </div>
                                    <a href='#room'><button>Select Room</button></a>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='flexXY'>
                    <div className='hotelCardInfo-container-main flexBet'>
                        <div className='hotelCardInfo-container-leftMain flex'>
                            <div id='general' className='hotelCardInfo-container-leftMain-contain1 flex'>
                                <h1>{hotelInfoResult.name}, {hotelInfoResult.location && hotelInfoResult.location.match(/([^,]+)/) ? hotelInfoResult.location.match(/([^,]+)/)[0] : hotelInfoResult.location}</h1>
                                <h2>{hotelInfoResult.rating}-star Hotel · {hotelInfoResult.location}</h2>
                                <div className='hotelCardInfo-container-leftMain-contain1-rating flexY g20'>
                                    <h2>{hotelInfoResult.rating}/5</h2>
                                    <div className='flexY g2'>{ratingOwl}{ratingCircle}{ratingCircle}{ratingCircle}{ratingCircle}{ratingCircle}</div>
                                    <div className='flexY'><p>{hotelInfoResult.rating > 4 ? '(631 reviews)' : hotelInfoResult.rating > 3 ? '(456 reviews)' : hotelInfoResult.rating > 2 ? '(330 reviews)' : hotelInfoResult.rating > 1 ? '(190 reviews)' : '(No reviews)'}</p>{rightArrow}</div>
                                </div>
                                <div className=' flex'>
                                    <div className=' hello'>
                                        <div className='hotelCardInfo-container-leftMain-contain1-meal flex'>
                                            <GiHotMeal style={{ fontSize: "20px" }} />
                                            <div>
                                                <p className='meal-plans'>Free breakfast on select plans</p>
                                                <p className='meal-offer'>Some plans include free breakfast</p>
                                            </div>
                                        </div>
                                        <div className='hotelCardInfo-container-leftMain-contain1-meal flex'>
                                            {hotelIcon}
                                            <div>
                                                <p className='meal-plans'>Child and Extra Bed Policy</p>
                                                <p className='meal-offer'>Extra Bed for additinol guest : {hotelInfoResult.childAndExtraBedPolicy.extraBedForAdditionalGuest === true ? 'Yes' : 'No'}</p>
                                                <p className='meal-offer'>Extra Bed provided for child : {hotelInfoResult.childAndExtraBedPolicy.extraBedProvidedForChild === true ? 'Yes' : 'No'}</p>
                                                {(hotelInfoResult.childAndExtraBedPolicy.extraBedForAdditionalGuest === true || hotelInfoResult.childAndExtraBedPolicy.extraBedProvidedForChild === true) && <p className='meal-offer'>Extra Bed Charge : {hotelInfoResult.childAndExtraBedPolicy.extraBedCharge}₹</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className=' hello'>
                                        <div className='hotelCardInfo-container-leftMain-contain1-meal flex'>
                                            <MdOutlineVerified style={{ fontSize: "20px" }} />
                                            <div>
                                                <p className='meal-plans'>Best in className service</p>
                                                <p className='meal-offer'>Service at this property rated {hotelInfoResult.rating}.0</p>
                                            </div>
                                        </div>
                                        <div className='hotelCardInfo-container-leftMain-contain1-meal amenities flex'>
                                            <RxInfoCircled style={{ fontSize: "20px" }} />
                                            <div>
                                                <p className='meal-plans'>Additinal Info</p>
                                                <p className='meal-offer'>{hotelInfoResult.childAndExtraBedPolicy.additionalInfo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id='amenities' className='hotelCardInfo-container-leftMain-contain2 flexc'>
                                <h1>Amenities</h1>
                                <div className='hotelCardInfo-container-leftMain-contain2-amenities flex'>
                                    <div className='hotelCardInfo-container-leftMain-contain2-amenities-sec1 flex'>
                                        {hotelInfoResult.amenities && hotelInfoResult.amenities.map((item, index) => (
                                            <div key={index} className='flexY g10'>{item == "Gym" ? <GiGymBag /> : item == "Swimming Pool" ? <FaPersonSwimming /> : item == "Restaurant" ? <MdRestaurant /> : item == "Bar" ? <MdTableBar /> : item == "Free WiFi" ? <MdOutlineSignalWifi4Bar /> : item == "Spa" ? <FaSprayCanSparkles /> : ""}<p>{item}</p></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='hotelCardInfo-container-rightMain'>
                            <Suspense fallback={<div className='loader'></div>}>
                                <div className='hotelInfoCarausal'>{hotelInfoResult.images && <InfoCarausal data={hotelInfoResult.images} />}</div>
                            </Suspense>
                            <div className='hotelCardInfo-container-rightMain-payment '>
                                <div className='hotelCardInfo-container-rightMain-payment-sec1 flexBet'>
                                    <div className='hotelMain-sec3'>
                                        <div className='hotelMain-sec3-container1 flexY'>
                                            <p className='contain1'>₹{Math.floor(hotelInfoResult.avgCostPerNight).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1,')}</p>
                                            <p className='contain2'>+ ₹{(((hotelInfoResult.avgCostPerNight * 18) / 100)).toString().match(/^(\d+)(?=\.)/) ? (((hotelInfoResult.avgCostPerNight * 18) / 100)).toString().match(/^(\d+)(?=\.)/)[0] : ((hotelInfoResult.avgCostPerNight * 18) / 100)}</p>
                                            <p className='contain3'>tax / night</p>
                                        </div>
                                        <div className='hotelMain-sec3-container2 flexY'>
                                            <del className='contain1'>{Math.floor((hotelInfoResult.avgCostPerNight * 18) / 100).toString()}</del>
                                            &nbsp;<p className='contain3'>{hotelInfoResult.avgCostPerNight > 5000 && `No cost EMI from ₹${Math.floor(hotelInfoResult.avgCostPerNight / 2)}`}</p>
                                        </div>
                                    </div>
                                    <a href='#room'><button onClick={() => handlePriceSecPopup()}>Select Room</button></a>
                                </div>
                                <div className='hotelCardInfo-container-leftMain-contain1-meal flex'>
                                    <GiHotMeal style={{ fontSize: "20px" }} />
                                    <div>
                                        <p id='meal-plans'>Free breakfast on select plans</p>
                                        <p id='meal-offer'>Some plans include free breakfast</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div id='room' className='hotelRoomsSection flexXY'>
                    <div className='hotelRoomsSection-section flexXY'>
                        {hotelInfoResult.rooms && hotelInfoResult.rooms.map((item, index) => (
                            <div key={index} className='hotelRoomsSection-container flex'>
                                <h1>{item.roomType}</h1>
                                <div className='sec1 flexY'>
                                    <div className=' flexBet g10'>
                                        <GiHotMeal style={{ fontSize: "20px" }} />
                                        <p>Breakfast</p>
                                    </div>
                                    <div className='flexBet g10'>
                                        <MdOutlineFreeCancellation style={{ fontSize: "20px" }} />
                                        <p>{item.cancellationPolicy}</p>
                                    </div>
                                </div>
                                <div className='hotelRoomsSection-container-price-section'>
                                    <div className='flexY'>
                                        <p className='contain1'>₹{Math.floor(item.costDetails.baseCost).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1,')}</p>
                                        &nbsp;<p className='contain2'>+ ₹{((item.costDetails.taxesAndFees)).toString().match(/^(\d+)(?=\.)/) ? (item.costDetails.taxesAndFees).toString().match(/^(\d+)(?=\.)/)[0] : (item.costDetails.taxesAndFees)} &nbsp; tax / night</p>
                                    </div>
                                    <div className='flexY'>
                                        <del className='contain3'>{Math.floor(item.price).toString()}</del>
                                        &nbsp;<p className='contain4'>{item.costDetails.baseCost > 5000 && `No cost EMI from ₹${Math.floor(item.costDetails.baseCost / 2)}`}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleToPayment()}>Book</button>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer/>
            </div>}
            {!load && <div className='loader'></div>}
        </>
    );
}

export default HotelsCardInfo;
