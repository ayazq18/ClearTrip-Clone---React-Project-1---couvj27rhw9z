import React, { useEffect, useMemo, useState} from "react";
import { useNavigate, } from "react-router-dom";
import { Base_URL, Project_ID, object, arr, handleselectionCategory} from "../Constants.js";
import { flightgo, flyFrom, swapIcon } from "../../Services/Icons.js";
import "./Form.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BiUser } from "react-icons/bi";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { MdKeyboardArrowDown, MdCompareArrows } from "react-icons/md";
import { PiCheckBold } from "react-icons/pi";
import { useAuthContext } from "../ContextAllData.js";

export default function Form() {
    const { all, setall } = useAuthContext()
    const {infantcount, setinfantCount, childrencount, setChildrenCount, adultcount, setAdultCount, handleIncrease, handleDecrease} = handleselectionCategory()
    const [flightIn, setFlightIn] = useState("");
    const [flightOut, setFlightOut] = useState("");
    const [flightWhere, setFlightWhere] = useState([]);
    const [flightTo, setFlightTo] = useState([]);
    const [selectedFlightIn, setSelectedFlightIn] = useState(null);
    const [selectedFlightOut, setSelectedFlightOut] = useState(null);
    const [whereDate, setWhereDate] = useState(`${new Date().toISOString().split("T")[0]}`);
    const [toDate, setToDate] = useState(`${new Date().toISOString().split("T")[0]}`);
    const [day, setDay] = useState()
    const [isDisabled, setIsDisabled] = useState(true);
    const [way, setWay] = useState(false);
    const [rotateCateg, setRotateCateg] = useState({ transform: "rotate(0deg)" });
    const [selectVisible, setSelectVisible] = useState(false);
    const [whereFrom, setWhereFrom] = useState(false);
    const [whereTo, setWhereTo] = useState(false);
    const [ways, setWays] = useState("One way");
    const [rotateWay, setRotateWay] = useState({ transform: "rotate(0deg)" });
    const [classs, setClasss] = useState("Economy");
    const [fare, setFare] = useState("Regular fare");

    //   -----------functions-----------------


    const handleClass = (category) => {
        setClasss(category);
    };

    const handleFare = (category) => {
        setFare(category);
    };

    const handleTrip = () => {
        setWay(!way);
        setSelectVisible(false);
        setWhereFrom(false);
        setWhereTo(false);
        setRotateWay(
            way ? { transform: "rotate(0deg)", transition: 'transform 0.3s ease-in-out', } : { transform: "rotate(180deg)", transition: 'transform 0.3s ease-in-out', }
        );
    };

    const handleSelectCategory = () => {
        setSelectVisible(!selectVisible);
        setWhereFrom(false);
        setWhereTo(false);
        setWay(false);
        setRotateCateg(
            selectVisible
                ? { transform: "rotate(0deg)", transition: 'transform 0.3s ease-in-out', }
                : { transform: "rotate(180deg)", transition: 'transform 0.3s ease-in-out', }
        );
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

    const onHandleSelectFlightIn = (selectedFlightIn) => {
        setSelectedFlightIn(selectedFlightIn)
        setFlightIn(`${selectedFlightIn.iata_code} - ${selectedFlightIn.city}, ${selectedFlightIn.country}`)
        setWhereFrom(false)
    }

    const onHandleSelectFlightOut = (selectedFlightOut) => {
        setSelectedFlightOut(selectedFlightOut)
        setFlightOut(`${selectedFlightOut.iata_code} - ${selectedFlightOut.city}, ${selectedFlightOut.country}`)
        setWhereTo(false)
    }

    const swapInputs = () => {
        if (selectedFlightIn && selectedFlightOut) {
            const tempFlightIn = {
                iata_code: selectedFlightIn.iata_code,
                city: selectedFlightIn.city,
                country: selectedFlightIn.country
            };
            const tempFlightOut = {
                iata_code: selectedFlightOut.iata_code,
                city: selectedFlightOut.city,
                country: selectedFlightOut.country
            };

            setSelectedFlightIn(tempFlightOut);
            setSelectedFlightOut(tempFlightIn);
            setWhereFrom(false);
            setWhereTo(false);

            setFlightIn(`${tempFlightOut.iata_code} - ${tempFlightOut.city}, ${tempFlightOut.country}`);
            setFlightOut(`${tempFlightIn.iata_code} - ${tempFlightIn.city}, ${tempFlightIn.country}`);
        }
    };


    const navigate = useNavigate()
    const handleSearchFlight = (e) => {
        e.preventDefault(); 
            setall(prev => ({ ...prev, flightIn: flightIn, flightOut: flightOut, flightWhere:{flightWhere}, flightTo:{flightTo}, day: day, whereDate: whereDate, selectedFlightIn:selectedFlightIn, selectedFlightOut:selectedFlightOut }));
            (flightIn !== flightOut && flightIn !== "" && flightOut !== "" && whereDate !== "") && navigate(`/flights/results?source=${flightIn}&destination=${flightOut}&date=${whereDate}&dayOfWeek=${day}`, {state:flightWhere});
    }

  

    //   -----------functions-----------------


    const selectedDate = new Date(whereDate);
    const dayOfWeek = selectedDate.getDay();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const days = daysOfWeek[dayOfWeek];

    const fetchFlightsIn = useMemo(async () => {
        try {
            const response = await fetch(`${Base_URL}/airport?search={"city":"${flightIn}"}`, {
                method: "GET",
                headers: {
                    projectID: Project_ID,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json()
            setFlightWhere(result.data.airports)
            setFlightTo(result.data.airports)
        } catch (error) {
            console.log (error);
        }
    }, [])

    useEffect(() => {
        setDay(days)
        fetchFlightsIn;
    }, []);

    return (
        // <div className="flexXY">
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
                            <div className="one-way flexXY">
                                {ways === "One way" && <PiCheckBold />}
                                <h4 onClick={() => { setWays("One way"), setIsDisabled(true) }}>One way</h4>
                            </div>
                            <div className="round-trip flexXY">
                                {ways === "Round trip" && <PiCheckBold />}
                                <h4 onClick={() => { setWays("Round trip"), setIsDisabled(false) }}> Round trip</h4>
                            </div>
                        </div>
                    )}
                </div>
                <div className="selectioncaegory">
                <div className="selectCateg flexXY" onClick={() => handleSelectCategory()}>
                    <BiUser className="" />
                    <h4>
                        {adultcount && (<> {adultcount} <span>Adult, </span> </>)}
                        {childrencount > 0 && (<>{childrencount} <span>Childrens, </span></>)}
                        {infantcount > 0 && (<>{infantcount} <span>Infant, </span></>)}
                    </h4>
                    <h4>{classs}</h4>
                    <MdKeyboardArrowDown style={rotateCateg} className="" />
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
                                    className={`${(items.category === "Adult" && adultcount > 1) ||
                                            (items.category === "Children" && childrencount > 0) ||
                                            (items.category === "Infant" && infantcount > 0)
                                            ? "changeToPosIcon"
                                            : "countNegIcon"
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
                                    className="countPosIcon"
                                    onClick={() => handleIncrease(items.category)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="selectCateg-Expand-btns-div flexY">
                        {object.map((category, index) => (
                            <h2 onClick={() => handleClass(category.class)} key={index}
                                className={`category ${classs === category.class ? "active-classs" : ""}`}>
                                {category.class}
                            </h2>
                        ))}
                    </div>
                </div>
            )}
            </div>
            </div>

            <div className="btns-div flexY">
                {object.map((category, index) => (
                    <h2 onClick={() => handleFare(category.fareType)} key={index}
                        className={`category ${fare === category.fareType ? "active-fare" : ""}`}>
                        {category.fareType}
                    </h2>
                ))}
            </div>
            <div className="input">
                <div className="input-text">
                    <h1 className="whereIconfrom">{flyFrom}</h1>
                    <h1 className="exchangeIcon" onClick={() => swapInputs()}>{swapIcon}</h1>
                    <input
                        id="input1"
                        type="text"
                        placeholder="Where from?"
                        value={flightIn}
                        onChange={(e) => { setFlightIn(e.target.value); showWhereFrom(flightWhere) }}
                        onClick={() => {
                            showWhereFrom();
                        }}
                    />
                    {whereFrom && (
                        <div className="expand-whereFrom">
                            {flightWhere && flightWhere.map((whereFromFlight, index) => (
                                <div key={whereFromFlight._id} className="wherefrom-container flexXY" onClick={() => onHandleSelectFlightIn(whereFromFlight)}>
                                    <div className="short">{whereFromFlight.iata_code}</div>
                                    <div className="full">{whereFromFlight.city}, {whereFromFlight.name}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    <input
                        id="input2"
                        type="text"
                        placeholder="Where to?"
                        value={flightOut}
                        onChange={(e) => { setFlightOut(e.target.value), showWhereTo(flightTo)}}
                        onClick={() => {
                            showWhereTo();
                        }}
                    />
                    <h1 className="whereIconTo">{flightgo}</h1>
                    {(flightIn === flightOut && flightIn !== "" && flightOut !== "") && (
                        <h5 className="error" style={{ color: "red" }}>Enter arrival airport / city</h5>
                    )}
                    {whereTo && (
                        <div className="expand-whereTo">
                            {flightTo && flightTo.map((whereToFlight, index) => (
                                <div key={whereToFlight._id} className="whereTo-container flexY" onClick={() => onHandleSelectFlightOut(whereToFlight)}>
                                    <div className="short">{whereToFlight.iata_code}</div>
                                    <div className="full">{whereToFlight.city}, {whereToFlight.name}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="input-date">
                    <div className="date-sec flex">
                        <input id="inputdate1" type="date" min={new Date().toISOString().split('T')[0]} value={whereDate} onChange={(e) => setWhereDate(e.target.value)}/>
                        <input id="inputdate22" type="date" min={new Date().toISOString().split('T')[0]} value={isDisabled ? "Return" : whereTo} onChange={(e) => setToDate(e.target.value)} disabled={isDisabled} />
                    </div>
                    <div className="searchBtn">
                        <button onClick={(e) => handleSearchFlight(e)} id="flightSearchBtn">
                            Search flights
                        </button>
                    </div>
                </div>
            </div>

        </form>
        // </div>
    )
}
