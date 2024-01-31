let tl;
import React, { useEffect, useState, useMemo } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import "../styles/FlightsResults.css";
import LoginSignup from '../SmallComp/LoginSignup';
import { useAuthContext } from './ContextAllData';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import MultiRangeSlider from "multi-range-slider-react";
import { CiCircleInfo } from "react-icons/ci";




export default function FlightsResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let flightFrom = searchParams.get("flightfrom");
    let flightTo = searchParams.get("flightto");
    let dayOfWeek = searchParams.get("dayofweek");
    const dateObject = new Date(dayOfWeek);


    const objdropdowncity = [{ name: "BLR", fname: "Bangalore, IN", lname: "- Kempegowda International Airport (BLR)" },
    { name: "BOM", fname: "Mumbai, IN", lname: "- Chatrapati Shivaji Airport (BOM)" },
    { name: "DEL", fname: "New Delhi, IN", lname: "- Indira Gandhi Airport (DEL)" },
    { name: "CCU", fname: "Kolkata, IN", lname: "- Netaji Subhas Chandra Bose Airport (CCU)" },
    { name: "GOI", fname: "Goa, IN", lname: "- Dabolim Airport (GOI)" },
    { name: "HYD", fname: "Hyderabad, IN", lname: "- Rajiv Gandhi International (HYD)" },
    { name: "MAA", fname: "Chennai, IN", lname: "- Chennai Airport (MAA)" },];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [logoflights, setlogoflights] = useState([
        "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/6E.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/SG.svg",
        "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/I5.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/UK.svg",
        "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/AI.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/QP.svg",
        "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/S5.svg"
    ])

    let count = 0;
    const [filter, setfilter] = useState({ "6E": true, "SG": true, "I5": true, "UK": true, "AI": true, "QP": true, "S5": true, "stops": null });
    const [rotateButton, setrotateButton] = useState({ ways: false, flightIn: false, flightOut: false, datego: false, datere: false, traveller: false });
    const [filterPopup, setfilterPopup] = useState({ stops: false, departure: false, wayprice: false, airline: false, duration: false, layover: false });
    const [flightResultsortingnav, setflightResultsortingnav] = useState({});
    const [pageLoader, setpageLoader] = useState(false);
    const { all, setall } = useAuthContext();
    const [dataa, setdataa] = useState();
    const [logincheck, setlogincheck] = useState(false)
    const [profiletoggle, setprofiletoggle] = useState(false);
    const [tokenAvailability, settokenAvailability] = useState();
    const [ways, setways] = useState("one");
    const [adult, setadult] = useState(1);
    const [children, setchildren] = useState(0);
    const [infant, setinfant] = useState(0);
    const [flightResultIn, setflightResultIn] = useState({ name: "", fname: "" });
    const [flightResultOut, setflightResultOut] = useState({ name: "", fname: "" });
    const [flightResultdatego, setflightResultdatego] = useState(dateObject.getDate());
    const [flightResultdaygo, setflightResultdaygo] = useState(days[dateObject.getDay()]);
    const [flightResultmonthgo, setflightResultmonthgo] = useState(months[dateObject.getMonth()]);
    const [travellersCount, settravellersCount] = useState(adult + children + infant);
    const [functionCalltoggle, setfunctionCalltoggle] = useState(false);
    const [calenderdate, setcalenderdate] = useState();
    const [onewayPrice, setonewayPrice] = useState("2,500");
    const [tripdurationmin, settripdurationmin] = useState(1);
    const [tripdurationmax, settripdurationmax] = useState(10);
    const [layovermin, setlayovermin] = useState(0);
    const [layovermax, setlayovermax] = useState(24);
    const [togglecardfulldetails, settogglecardfulldetails] = useState({});
    const [valuee, setvaluee] = useState(2500);

    function airlineSelector(key) {
        setTimeout(() => {
            setfilter((prev) => ({ ...prev, [key]: !filter[key] }));
        }, 10);
    }
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

    function togglecarddetails(val) {
        settogglecardfulldetails({})
        settogglecardfulldetails({ [val]: !togglecardfulldetails[val] });
    }

    function swaplocations() {
        const temp = flightResultIn;
        setflightResultIn(flightResultOut);
        setflightResultOut(temp);
    }

    function sortingnav(key) {
        setflightResultsortingnav({})
        setflightResultsortingnav({ [key]: !flightResultsortingnav[key] });
    }


    function message() {
        if (count == 0) {
            return <div className='errorMessage flexja'><div className='innererrormessage flexja'><CiCircleInfo className='iconerrormessage' /> &nbsp;No Flights Are Available</div></div>;
        }
    }

    function locationSetterMountingPhase() {
        objdropdowncity.map((item) => (flightFrom == item.name ? setflightResultIn(prev => ({ ...prev, name: item.name, fname: item.fname })) : ""))
        objdropdowncity.map((item) => (flightTo == item.name ? setflightResultOut(prev => ({ ...prev, name: item.name, fname: item.fname })) : ""))
    }

    const onewayPricewithcomma = (number) => {
        clearTimeout(tl);
        tl = setTimeout(() => {
            setvaluee(number);
        }, 3000);
        setonewayPrice(number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    };

    const onewayPricewithoutcomma = () => {
        return parseInt(onewayPrice.replace(/,/g, ''), 10);
    }

    function numberwithComma(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function buttonRotate(key) {
        setrotateButton({});
        setrotateButton((prev) => ({ ...prev, [key]: !rotateButton[key] }));
    }
    function filterbuttonRotate(key) {
        setfilterPopup((prev) => ({ ...prev, [key]: !filterPopup[key] }));
    }

    function buttonRotateAllFalse() {
        setrotateButton((prev) => ({ prev: false }));
    }

    function finishtoken() {
        localStorage.removeItem("token");
        settokenAvailability(false);
        checklogin();
    }

    function navigateToFlightInfo(_id) {
        if (localStorage.getItem("token")) {
            navigate(`/flights/results/Info?flightid=${_id}&date=${dateObject}`)
        }
        else {
            setlogincheck(true);
        }
    }

    function forwardRoute() {
        navigate(`/flights/results?flightfrom=${flightResultIn.name}&flightto=${flightResultOut.name}&dayofweek=${calenderdate}`);
        setfunctionCalltoggle(!functionCalltoggle);
    }

    function logofinder(item) {
        if ((item.flightID[0] + item.flightID[1]) == "6E") { return logoflights[0]; }
        if ((item.flightID[0] + item.flightID[1]) == "SG") { return logoflights[1]; }
        if ((item.flightID[0] + item.flightID[1]) == "I5") { return logoflights[2]; }
        if ((item.flightID[0] + item.flightID[1]) == "UK") { return logoflights[3]; }
        if ((item.flightID[0] + item.flightID[1]) == "AI") { return logoflights[4]; }
        if ((item.flightID[0] + item.flightID[1]) == "QP") { return logoflights[5]; }
        if ((item.flightID[0] + item.flightID[1]) == "S5") { return logoflights[6]; }
    }

    function airlineNamefinder(item) {
        if ((item.flightID[0] + item.flightID[1]) == "6E") { return "IndiGo"; }
        if ((item.flightID[0] + item.flightID[1]) == "SG") { return "SpiceJet"; }
        if ((item.flightID[0] + item.flightID[1]) == "I5") { return "Air India Express"; }
        if ((item.flightID[0] + item.flightID[1]) == "UK") { return "Vistara"; }
        if ((item.flightID[0] + item.flightID[1]) == "AI") { return "Air India"; }
        if ((item.flightID[0] + item.flightID[1]) == "QP") { return "Akasa Air"; }
        if ((item.flightID[0] + item.flightID[1]) == "S5") { return "Star Air"; }
    }

    function checklogin() {
        const token = JSON.parse(localStorage.getItem("token")) || [];
        if (typeof token == "object") {
            setlogincheck((e) => true);
        }
        if (typeof token == "string") {
            settokenAvailability(true)
        }
    }
    useEffect(() => {
        checklogin();
    }, [])

    const fetchdataForFlightsMountingPhase = useMemo(async () => {
        try {
            const response = await (await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${flightFrom}","destination":"${flightTo}"}&day=${days[dateObject.getDay()]}&filter={${filter.stops != null ? `"stops":${filter.stops},` : ""}${`"ticketPrice":{"$lte":${valuee}}`},"duration":{"$lte":${tripdurationmax},"$gte":${tripdurationmin}}}&limit=20&page=1&sort={${Object.keys(flightResultsortingnav).length === 0 ? "" : `"${Object.keys(flightResultsortingnav)[0]}":${flightResultsortingnav[`${Object.keys(flightResultsortingnav)[0]}`] == true ? "1" : "-1"}`}}`,
                {
                    method: "GET",
                    headers: {
                        projectID: "mhroh2oic5sz",
                        "Content-Type": "application/json",
                    }
                }
            )).json();
            setdataa(response.data.flights);
            setpageLoader(true);
            locationSetterMountingPhase();
        } catch (error) {
            alert(error);
        }
    }, [functionCalltoggle, valuee, filter, flightResultsortingnav, tripdurationmax, tripdurationmin])

    useEffect(() => {
        setpageLoader(false);
        fetchdataForFlightsMountingPhase;
        setcalenderdate(dateObject);
    }, []);

    return (
        <div className='flightResultMain'>
            {logincheck && <LoginSignup settokenAvailability={settokenAvailability} checklogin={checklogin} formClose={setlogincheck} />}
            <nav className='navFlightResults flexja'>
                <div className='innernav'>
                    <div className='uppernav flexa'>
                        <div className='upperLeftIcons flex'>
                            <Link to="/"><svg width="107" height="24" viewBox="0 0 310 65" fill="none" ><path d="M249.469 16.3906C243.189 16.3906 240.039 19.1706 240.039 25.4606V49.1506H247.469V25.8206C247.469 23.7506 248.399 22.7506 250.539 22.7506H257.039V16.3906H249.469V16.3906Z" fill="#FF4F17"></path><path d="M264.891 1.59961C262.461 1.59961 260.461 3.59961 260.461 6.09961C260.461 8.59961 262.461 10.5296 264.891 10.5296C267.321 10.5296 269.391 8.52961 269.391 6.09961C269.391 3.66961 267.391 1.59961 264.891 1.59961Z" fill="#FF4F17"></path><path d="M268.61 16.2402H261.25V49.0902H268.61V16.2402Z" fill="#FF4F17"></path><path d="M121.289 42.8804C119.149 42.8804 118.219 42.3104 118.219 40.1704V1.65039H110.789V40.1704C110.789 46.6704 114.429 49.2404 120.139 49.2404H124.069V42.8804H121.289V42.8804Z" fill="#FF4F17"></path><path d="M209.119 16.2695C202.839 16.2695 199.689 19.0495 199.689 25.3395V49.1195H207.119V25.6995C207.119 23.6295 208.049 22.6295 210.189 22.6295H216.689V16.2695H209.119Z" fill="#FF4F17"></path><path d="M228.33 16.2998V8.08984H220.9V40.0798C220.9 46.2898 224.11 49.1498 230.33 49.1498H235.9V42.7898H231.4C229.4 42.7898 228.33 42.0798 228.33 40.0798V22.6598H235.9V16.2998H228.33V16.2998Z" fill="#FF4F17"></path><path d="M274.82 16.5006V63.3706H282.25V46.3006C284.91 48.1406 288.13 49.2306 291.6 49.2306C300.67 49.2306 308.02 41.8806 308.02 32.8106C308.02 23.7406 300.67 16.3906 291.6 16.3906C288.12 16.3906 284.9 17.4806 282.25 19.3206V16.5006H274.82V16.5006ZM282.25 32.8106C282.25 27.6406 286.44 23.4606 291.6 23.4606C296.76 23.4606 300.95 27.6506 300.95 32.8106C300.95 37.9706 296.76 42.1606 291.6 42.1606C286.44 42.1606 282.25 37.9706 282.25 32.8106V32.8106Z" fill="#FF4F17"></path><path d="M156.92 32.1006C156.92 22.1006 150.21 16.3906 141.42 16.3906C131.57 16.3906 125.5 23.2506 125.5 32.7406C125.5 42.2306 132.21 49.2406 141.57 49.2406C149.85 49.2406 154.21 45.5306 156.28 39.3906H148.28C147.07 41.7506 144.78 42.8206 141.42 42.8206C136.99 42.8206 133.35 40.0406 133.07 35.0406H156.78C156.92 33.4706 156.92 32.7506 156.92 32.1106V32.1006ZM133.14 29.7406C133.78 25.3806 136.85 22.7406 141.64 22.7406C146.43 22.7406 149.07 25.2406 149.49 29.7406H133.14Z" fill="#FF4F17"></path><path d="M98.8005 37.9506C97.5905 41.3806 95.3005 42.8106 91.8705 42.8106C86.2305 42.8106 83.8005 38.3806 83.8005 32.7406C83.8005 27.1006 86.5805 22.7406 92.0105 22.7406C95.4405 22.7406 97.7205 24.5306 98.7905 27.6006H106.72C104.86 20.1006 99.2905 16.3906 91.8705 16.3906C81.8705 16.3906 76.2305 23.5306 76.2305 32.7406C76.2305 42.7406 82.8705 49.2406 91.8705 49.2406C100.87 49.2406 105.22 44.1706 106.72 37.9606H98.7905L98.8005 37.9506Z" fill="#FF4F17"></path><path d="M56.6095 17.7393C44.1095 26.8793 33.3295 38.8793 23.6895 48.9493C22.9795 49.6593 22.0495 50.1593 21.0495 50.1593C19.8395 50.1593 18.9095 49.4493 18.0495 48.1593C15.5495 44.4493 11.7695 35.4493 10.0495 31.5193C8.68954 28.3093 9.40954 25.6593 12.6195 24.3093C15.8295 23.0193 19.3995 22.8093 20.2595 26.4493C20.2595 26.4493 21.8995 32.8093 22.3995 34.6593C32.3295 25.4493 44.5395 15.6693 54.8895 9.66929C52.3195 4.80929 47.2495 1.5293 41.4695 1.5293H16.9795C8.54954 1.5293 1.76953 8.30929 1.76953 16.6693V41.2293C1.76953 49.5793 8.54954 56.3693 16.9795 56.3693H41.4695C49.8195 56.3693 56.6095 49.5893 56.6095 41.2293V17.7393V17.7393Z" fill="#FF4F17"></path><path d="M186.059 16.5006V19.3206C183.399 17.4806 180.179 16.3906 176.709 16.3906C167.639 16.3906 160.289 23.7406 160.289 32.8106C160.289 41.8806 167.639 49.2306 176.709 49.2306C180.189 49.2306 183.409 48.1406 186.059 46.3006V49.0906H193.489V16.5006H186.059ZM176.709 42.1606C171.539 42.1606 167.359 37.9706 167.359 32.8106C167.359 27.6506 171.549 23.4606 176.709 23.4606C181.869 23.4606 186.059 27.6506 186.059 32.8106C186.059 37.9706 181.869 42.1606 176.709 42.1606Z" fill="#FF4F17"></path></svg></Link>
                            <Link to="/flights"><svg height="18px" width="18px" fill="#999"><title>Flights</title><path d="M16.115.426l-4.387 4.427L1.676 2.172 0 3.862l8.285 4.403-3.35 3.38-2.606-.322-1.325 1.336 2.955 1.568 1.554 2.981 1.325-1.336-.304-2.613 3.35-3.38 4.27 8.303 1.676-1.69-2.544-9.936 4.479-4.527c1.203-1.214-.462-2.802-1.65-1.603z" fill="#36C" fillRule="evenodd"></path></svg></Link>
                            <Link to="/hotels"><svg width="20" height="20" fill="#999"><title>Hotels</title><g fill="none" fillRule="evenodd"><path fill="#FFF" d="M0 0h20v20H0z"></path><path d="M17.65 16.364v-2.432H2.354v2.425H.002L0 4.73c0-1.458 2.358-1.458 2.358 0v6.791h15.256L20 11.515v4.849h-2.35zm-8.895-5.096h-4.96c-.942 0-.853-2.173.03-2.173h3.941V7.478c0-.764.471-1.195.989-1.281v-.012h.104c.056-.004.113-.004.17 0h9.67c.959 0 1.301.31 1.301 1.299v3.789H8.755v-.005zm-3.13-3.177c-1.036 0-1.875-.855-1.875-1.909s.84-1.91 1.875-1.91c1.035 0 1.875.856 1.875 1.91 0 1.054-.84 1.909-1.875 1.909z" fill="#36CD"></path></g></svg></Link>
                        </div>
                        <div className='upperrightIcons flex'>

                            <nav className='navUpperHome'>
                                {!tokenAvailability && <button className='loginoutBtn' onClick={() => setlogincheck(true)}>Log in / Sign up</button>}
                                {tokenAvailability && <button className='profileBtn flexja' onClick={(e) => { setprofiletoggle(!profiletoggle) }} ><svg viewBox="0 0 14 14" height="16px" width="16px" className="c-inherit"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.5"></circle><path fill="currentColor" d="M3,5 C4.38071187,5 5.5,3.88071187 5.5,2.5 C5.5,1.11928813 4.38071187,0 3,0 C1.61928813,0 0.5,1.11928813 0.5,2.5 C0.5,3.88071187 1.61928813,5 3,5 Z" transform="matrix(-1 0 0 1 10 3)"></path><path fill="currentColor" d="M7,9 C9.14219539,9 10.8910789,10.6839685 10.9951047,12.8003597 L11,13 L3,13 C3,10.790861 4.790861,9 7,9 Z"></path><circle cx="7" cy="7" r="7.75" stroke="#FFF" strokeWidth="1.5"></circle></g></svg>
                                    My account
                                    {profiletoggle &&
                                        <div className='profilePop flexja flexc'>

                                            <div className='profileSelectorDiv flexja'>
                                                <div className='profileSelectorleft'>
                                                    <h5>Account</h5>
                                                    <NavLink to="/hotels"><p className='profileSelectors flexa'><svg viewBox="0 0 14 14" height="16" width="16" className="c-neutral-400"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><path fill="currentColor" d="M13,9.46769027 L13,12 C13,12.5522847 12.5522847,13 12,13 L2,13 C1.44771525,13 1,12.5522847 1,12 L1,9.46769027 L13,9.46769027 Z M8.76884248,1.00969027 C9.32112723,1.00969027 9.76884248,1.45740552 9.76884248,2.00969027 L9.768,3.99969027 L12,4 C12.5522847,4 13,4.44771525 13,5 L13,7.96769027 L1,7.96769027 L1,5 C1,4.44771525 1.44771525,4 2,4 L4.268,3.99969027 L4.26884248,2.00969027 C4.26884248,1.45740552 4.71655774,1.00969027 5.26884248,1.00969027 L8.76884248,1.00969027 Z M8.268,2.509 L5.768,2.509 L5.767,3.99969027 L8.267,3.99969027 L8.268,2.509 Z"></path></g></svg><p>Trips</p></p></NavLink>
                                                    <NavLink to="/hotels"><p className='profileSelectors flexa'><svg viewBox="0 0 14 14" height="16" width="16" className="c-neutral-400"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><path fill="currentColor" fillRule="nonzero" stroke="currentColor" d="M6.66377804,12.0103667 C6.85467399,12.1862449 7.14840775,12.1868013 7.33996863,12.0116476 L7.52037698,11.846694 C10.4133674,9.18600047 11.3179531,8.24297499 11.9494023,7.05369364 C12.2679269,6.45377943 12.4230769,5.8833705 12.4230769,5.29700272 C12.4230769,3.72548999 11.2121985,2.5 9.66538462,2.5 C8.79968324,2.5 7.94470884,2.90670095 7.38258677,3.57477308 L7,4.02947068 L6.61741323,3.57477308 C6.05529116,2.90670095 5.20031676,2.5 4.33461538,2.5 C2.78780146,2.5 1.57692308,3.72548999 1.57692308,5.29700272 C1.57692308,5.88588466 1.73340796,6.4586853 2.05471743,7.06126617 C2.68799666,8.24891226 3.59889285,9.19694245 6.47994688,11.8409976 L6.66377804,12.0103667 Z"></path></g></svg><p>ShortLists</p></p></NavLink>
                                                    <NavLink to="/hotels"><p className='profileSelectors flexa'><svg viewBox="0 0 14 14" height="16" width="16" className="c-neutral-400"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><path fill="currentColor" d="M4.5,7 C6.43299662,7 8,8.56700338 8,10.5 L8,14 L1,14 L1,10.5 C1,8.56700338 2.56700338,7 4.5,7 Z M10.5002944,9 C11.8810062,9 13.0002944,10.1192881 13.0002944,11.5 L13.0002944,14 L9.50029435,13.9997654 L9.50029435,10.5057654 C9.50029435,10.083454 9.48261395,9.6733711 9.38403764,9.28165365 C9.72780691,9.10132075 10.0848802,9 10.5002944,9 Z M10.5242101,4 C11.6287796,4 12.5242101,4.8954305 12.5242101,6 C12.5242101,7.1045695 11.6287796,8 10.5242101,8 C9.41964058,8 8.52421008,7.1045695 8.52421008,6 C8.52421008,4.8954305 9.41964058,4 10.5242101,4 Z M4.5,1 C5.88071187,1 7,2.11928813 7,3.5 C7,4.88071187 5.88071187,6 4.5,6 C3.11928813,6 2,4.88071187 2,3.5 C2,2.11928813 3.11928813,1 4.5,1 Z"></path></g></svg><p>Travellers</p></p></NavLink>
                                                    <NavLink to="/hotels"><p className='profileSelectors flexa'><svg viewBox="0 0 14 14" height="16" width="16" className="c-neutral-400"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><path fill="currentColor" d="M10.9938128,1.8893206 C10.9979344,1.92619985 11,1.96327993 11,2.00038878 L11,2.9992998 L2.5,3 C2.25454011,3 2.05039163,3.17687516 2.00805567,3.41012437 L2,3.5 C2,3.74545989 2.17687516,3.94960837 2.41012437,3.99194433 L2.5,4 L12,4 C12.5522847,4 13,4.44771525 13,5 L13,12 C13,12.5522847 12.5522847,13 12,13 L2,13 C1.44771525,13 1,12.5522847 1,12 L1,5 L1.003,4.9462998 L1.00048219,4.89843613 L1,2.89446607 C1,2.38516155 1.38277848,1.95722081 1.88893182,1.90065328 L9.88893182,1.00657599 C10.4377995,0.945234733 10.9324715,1.34045296 10.9938128,1.8893206 Z M11,8 C10.4477153,8 10,8.44771525 10,9 C10,9.55228475 10.4477153,10 11,10 C11.5522847,10 12,9.55228475 12,9 C12,8.44771525 11.5522847,8 11,8 Z"></path></g></svg><p>Cleartrip Wallet</p></p></NavLink>
                                                    <NavLink to="/hotels"><p className='profileSelectors flexa'><svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="c-neutral-400"><path d="M11.1008 6.54288L12.0964 2.82779C12.2011 2.437 11.9417 2.16047 11.6665 2.08674C11.3914 2.01301 10.9756 2.32048 10.9756 2.32048L11.0285 2.1229C11.1856 1.53666 11.085 1.09317 10.7035 0.990929C10.3219 0.888689 9.98632 1.32248 9.85603 1.80873L9.82924 1.90872C9.82924 1.90872 9.6977 1.34976 9.37393 1.263C9.05016 1.17625 8.70913 1.39914 8.57825 1.88757L8.42176 2.47162C8.42176 2.47162 8.48102 1.85917 7.9926 1.7283C7.66883 1.64155 7.32721 1.8666 7.19692 2.35287L6.20149 6.06788C5.88733 7.24035 6.94727 9.31557 8.59504 9.64142C10.1295 9.94486 11.7497 8.81117 12.0638 7.63869L13.0521 5.12688C13.1824 4.64064 13.0005 4.42988 12.7463 4.31421C12.437 4.1735 11.1008 6.54288 11.1008 6.54288Z" fill="#808080" fill-opacity="0.7"></path><path d="M10.2949 4.86084L10.9756 2.32048M10.9756 2.32048L11.0285 2.1229C11.1856 1.53666 11.085 1.09317 10.7035 0.990929C10.3219 0.888689 9.98632 1.32248 9.85603 1.80873L9.82924 1.90872M10.9756 2.32048C10.9756 2.32048 11.3914 2.01301 11.6665 2.08674C11.9417 2.16047 12.2011 2.437 12.0964 2.82779L11.1008 6.54288C11.1008 6.54288 12.437 4.1735 12.7463 4.31421C13.0005 4.42988 13.1824 4.64064 13.0521 5.12688L12.0638 7.63869C11.7497 8.81117 10.1295 9.94486 8.59503 9.64142C6.94727 9.31557 5.88733 7.24035 6.20149 6.06788L7.19692 2.35287C7.32721 1.8666 7.66883 1.64155 7.9926 1.7283C8.48102 1.85917 8.42176 2.47162 8.42176 2.47162M8.42176 2.47162L7.94993 4.23251M8.42176 2.47162L8.57825 1.88757C8.70913 1.39914 9.05016 1.17625 9.37393 1.263C9.6977 1.34976 9.82924 1.90872 9.82924 1.90872M9.82924 1.90872L9.1224 4.54667" stroke="#D1D1D1" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3.95491 9.63425L1.4926 5.36977C1.23368 4.92117 1.46286 4.49322 1.7787 4.31087C2.09454 4.12852 2.71065 4.37097 2.71065 4.37097L2.5797 4.14417C2.19118 3.47123 2.16855 2.88946 2.60655 2.63658C3.04454 2.3837 3.60332 2.80896 3.92558 3.36713L3.99184 3.4819C3.99184 3.4819 3.96929 2.74705 4.34094 2.53248C4.71259 2.3179 5.2082 2.48054 5.5319 3.04121L5.91897 3.71163C5.91897 3.71163 5.64274 2.97387 6.20339 2.65018C6.57504 2.43561 7.0721 2.60072 7.39436 3.1589L9.85642 7.42334C10.6335 8.76921 10.0103 11.6868 8.08052 12.6358C6.28338 13.5196 3.9041 12.6544 3.12706 11.3085L1.07255 8.52971C0.750298 7.97155 0.905398 7.65064 1.1815 7.42334C1.51739 7.14683 3.95491 9.63425 3.95491 9.63425Z" fill="#808080"></path><path d="M4.39424 7.28703L2.71065 4.37097M2.71065 4.37097L2.5797 4.14417C2.19118 3.47123 2.16855 2.88946 2.60655 2.63658C3.04454 2.3837 3.60332 2.80896 3.92558 3.36713L3.99184 3.4819M2.71065 4.37097C2.71065 4.37097 2.09454 4.12852 1.7787 4.31087C1.46286 4.49322 1.23368 4.92117 1.4926 5.36977L3.95491 9.63425C3.95491 9.63425 1.51739 7.14683 1.1815 7.42334C0.905398 7.65064 0.750298 7.97155 1.07255 8.52971L3.12706 11.3085C3.9041 12.6544 6.28338 13.5196 8.08052 12.6358C10.0103 11.6868 10.6335 8.76921 9.85643 7.42334L7.39436 3.1589C7.0721 2.60072 6.57504 2.43561 6.20339 2.65018C5.64274 2.97387 5.91897 3.71163 5.91897 3.71163M5.91897 3.71163L7.08598 5.73295M5.91897 3.71163L5.5319 3.04121C5.2082 2.48054 4.71259 2.3179 4.34094 2.53248C3.96929 2.74705 3.99184 3.4819 3.99184 3.4819M3.99184 3.4819L5.74011 6.50999" stroke="#B3B3B3" strokeWidth="0.545068" strokeLinecap="round" strokeLinejoin="round"></path></svg> <p>Hi-Five</p></p></NavLink>
                                                    <NavLink to="/hotels"><p className='profileSelectors flexa'><svg viewBox="0 0 14 14" height="16" width="16" className="c-neutral-400"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><path fill="currentColor" fillRule="nonzero" d="M0.646446609,6.64644661 L0.590530795,6.71219845 C0.362196938,7.03084485 0.584244403,7.5 1,7.5 L4.5,7.5 L4.5,13 C4.5,13.2761424 4.72385763,13.5 5,13.5 L9,13.5 L9.08987563,13.4919443 C9.32312484,13.4496084 9.5,13.2454599 9.5,13 L9.5,7.5 L13,7.5 C13.4454524,7.5 13.6685358,6.96142904 13.3535534,6.64644661 L7.35355339,0.646446609 C7.15829124,0.451184464 6.84170876,0.451184464 6.64644661,0.646446609 L0.646446609,6.64644661 Z"></path></g></svg><p>Expressway</p></p></NavLink>
                                                    <NavLink to="/hotels"><p className='profileSelectors flexa'><svg viewBox="0 0 103 94" height="16" width="16" fill="#999" className=""><path fillRule="evenodd" d="M63.869 3.11c.615 2.336 5.017 2.131 6.55 3.684 1.937 1.962 3.359 6.55 3.372 9.708.007 1.8.09 3.601-.175 5.741-.062.5-.206 4.238-.421 6.56-.104 1.114.088 1.422.923 1.736.95.36 1.285 1.421.966 2.904-.677 3.16-1.535 10.722-2.636 12.758-.29.536-.834.943-1.283 1.048-.777.323-1.274.288-1.572 1.59-1.025 4.704-1.89 8.855-2.81 11.921-.608 1.072-1.06 1.418-1.766 1.91-.497.345-1.406 1.255-1.477 1.919-.181 1.702.313 3.77 1.954 4.561 10.353 3.892 22.675 9.347 30.774 11.252 5.516 1.298 6.503 7.34 6.503 12.871H0C0 87.742.987 81.7 6.503 80.402c8.099-1.905 20.42-7.36 30.773-11.252 1.642-.792 2.136-2.86 1.954-4.561-.07-.664-.98-1.574-1.477-1.92-.706-.49-1.157-.837-1.766-1.909-.92-3.066-1.785-7.217-2.809-11.921-.299-1.302-.796-1.267-1.573-1.59-.448-.105-.993-.512-1.282-1.048-1.1-2.036-1.96-9.598-2.637-12.758-.318-1.483.016-2.545.966-2.904.836-.314 1.027-.622.924-1.736-.216-2.322-.36-6.06-.421-6.56-.266-2.14-.337-3.95-.175-5.74.273-3.017 1.6-6.19 3.628-7.925 4.034-3.451 9.842-6.096 15.157-7.48 2.027-.53 5.15-1.022 8.08-1.086 2.482-.053 7.188-.078 8.024 3.097"></path></svg><p>Profile</p></p></NavLink>
                                                    <NavLink to="/hotels"><p className='profileSelectors flexa'><svg viewBox="0 0 14 14" height="16" width="16" className="c-neutral-400"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><g transform="translate(-.5)"><path stroke="currentColor" strokeWidth="2" d="M7.5,11.7619821 C10.1233526,11.7619821 12.25,9.63533468 12.25,7.01198212 C12.25,4.38862956 10.1233526,2.26198212 7.5,2.26198212 C4.87664744,2.26198212 2.75,4.38862956 2.75,7.01198212 C2.75,9.63533468 4.87664744,11.7619821 7.5,11.7619821 Z"></path><g fill="currentColor" transform="translate(6)"><polygon points=".5 11 2.5 11 2.5 14 .5 14"></polygon><polygon points=".5 0 2.5 0 2.5 3 .5 3"></polygon></g><g fill="currentColor" transform="rotate(-45 4.5 -.243)"><polygon points=".5 11 2.5 11 2.5 14 .5 14"></polygon><polygon points=".5 0 2.5 0 2.5 3 .5 3"></polygon></g><g fill="currentColor" transform="rotate(45 4.5 14.243)"><polygon points=".5 11 2.5 11 2.5 14 .5 14"></polygon><polygon points=".5 0 2.5 0 2.5 3 .5 3"></polygon></g><g fill="currentColor" transform="rotate(90 4.5 10)"><polygon points=".5 11 2.5 11 2.5 14 .5 14"></polygon><polygon points=".5 0 2.5 0 2.5 3 .5 3"></polygon></g></g></g></svg><p>Settings</p></p></NavLink>
                                                </div>
                                                <div className='profileSelectorright'>
                                                    <h5>Quick tools</h5>
                                                    <NavLink to="/hotels"><p className='profileSelectors rightPS flexa'><svg viewBox="0 0 14 14" className="c-secondary-500" height="16" width="16"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><path fill="currentColor" fillRule="nonzero" d="M7,0.506145606 C10.5898509,0.506145606 13.5,3.41629473 13.5,7.00614561 C13.5,10.5959965 10.5898509,13.5061456 7,13.5061456 C3.41014913,13.5061456 0.5,10.5959965 0.5,7.00614561 C0.5,3.41629473 3.41014913,0.506145606 7,0.506145606 Z M7,2.00614561 C4.23857625,2.00614561 2,4.24472186 2,7.00614561 C2,9.76756936 4.23857625,12.0061456 7,12.0061456 C9.76142375,12.0061456 12,9.76756936 12,7.00614561 C12,4.24472186 9.76142375,2.00614561 7,2.00614561 Z M9.95170499,6.25 L9.95170499,7.75 L4,7.75 L4,6.25 L9.95170499,6.25 Z"></path></g></svg><p>Cancellations</p></p></NavLink>
                                                    <NavLink to="/hotels"><p className='profileSelectors rightPS flexa'><svg viewBox="0 0 14 14" className="c-secondary-500" height="16" width="16"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><path fill="currentColor" fillRule="nonzero" d="M10.2668078,7.9689266 L12.8037656,10.4358768 C13.0747077,10.6993422 13.0993388,11.1151056 12.8776589,11.4062615 L12.8037656,11.4895931 L10.2668078,13.9565433 L9.21220667,12.902827 L10.3256362,11.8201617 C9.09324498,11.7008095 8.15528162,11.3539959 7.53165946,10.7438555 L7.39333574,10.5983631 L8.49545964,9.59597947 L8.57836232,9.68117546 C8.90069746,9.98312464 9.45117369,10.1985626 10.2448054,10.3004475 L10.4902046,10.3275793 C10.5070205,10.3291543 10.5293571,10.3305626 10.5571255,10.3318005 L9.21220667,9.02264295 L10.2668078,7.9689266 Z M10.2668078,0.0434566847 L12.8037656,2.51040687 C13.0747077,2.77387225 13.0993388,3.18963564 12.8776589,3.48079157 L12.8037656,3.56412322 L10.2668078,6.0310734 L9.21220667,4.97735705 L10.36,3.861 L9.90547203,3.86319783 C7.75690071,3.85907413 6.766746,4.78606842 6.70312299,6.87606591 L6.6998369,7.0964307 C6.6998369,10.1345163 4.79337963,11.76317 1.29936687,11.8611255 L1.02747077,11.8656394 L0.00323858539,11.8679129 L-3.01092484e-13,10.366261 L1.02189677,10.3639964 C3.84757515,10.3486777 5.14036442,9.36504783 5.21612054,7.29380019 L5.21966679,7.0964307 C5.21966679,4.1050435 6.77779721,2.44923727 9.6542424,2.36492217 L10.51,2.358 L9.21220667,1.09717303 L10.2668078,0.0434566847 Z M1.03670265,2.59215268 L1.34961383,2.59595624 C2.88866715,2.63405802 4.04499582,2.95941162 4.81023737,3.61667181 L4.9580687,3.75256249 L3.92748451,4.8304344 L3.82564589,4.73926653 C3.3540282,4.35409048 2.51563444,4.12564382 1.30241769,4.09689616 L1.03670265,4.09380823 L0.0016192927,4.09380823 L0.0016192927,2.59215268 L1.03670265,2.59215268 Z"></path></g></svg><p>Change flight</p></p></NavLink>
                                                    <NavLink to="/hotels"><p className='profileSelectors rightPS flexa'><svg viewBox="0 0 14 14" height="16" width="16" className="c-secondary-500"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><path fill="currentColor" fillRule="nonzero" d="M5.5,1 C5.5,1.82842712 6.17157288,2.5 7,2.5 C7.82842712,2.5 8.5,1.82842712 8.5,1 L11,1 C11.5522847,1 12,1.44771525 12,2 L12,12 C12,12.5522847 11.5522847,13 11,13 L8.5,13 C8.5,12.1715729 7.82842712,11.5 7,11.5 C6.17157288,11.5 5.5,12.1715729 5.5,13 L3,13 C2.44771525,13 2,12.5522847 2,12 L2,2 C2,1.44771525 2.44771525,1 3,1 L5.5,1 Z M4.402,2.499 L3.5,2.499 L3.5,6 L5,6 L5,7.5 L3.5,7.5 L3.5,11.499 L4.402,11.499 L4.46706391,11.3917355 C4.96982923,10.6015566 5.83218191,10.0625441 6.82372721,10.0050927 L7,10 C8.06512059,10 9.00059634,10.5550755 9.53293609,11.3917355 L9.597,11.499 L10.5,11.499 L10.5,7.5 L9,7.5 L9,6 L10.5,6 L10.5,2.499 L9.597,2.499 L9.53293609,2.60826455 C9.03017077,3.39844335 8.16781809,3.93745585 7.17627279,3.99490731 L7,4 C5.93487941,4 4.99940366,3.44492446 4.46706391,2.60826455 L4.402,2.499 Z M8,6 L8,7.5 L6,7.5 L6,6 L8,6 Z"></path></g></svg><p>print ticket</p></p></NavLink>
                                                    <NavLink to="/hotels"><p className='profileSelectors rightPS flexa'><svg viewBox="0 0 14 14" height="16" width="16" className="c-secondary-500"><g fill="none" fillRule="evenodd"><rect width="14" height="14" fill="#FFF" opacity="0"></rect><path fill="currentColor" fillRule="nonzero" d="M5.5,1 C5.5,1.82842712 6.17157288,2.5 7,2.5 C7.82842712,2.5 8.5,1.82842712 8.5,1 L11,1 C11.5522847,1 12,1.44771525 12,2 L12,12 C12,12.5522847 11.5522847,13 11,13 L8.5,13 C8.5,12.1715729 7.82842712,11.5 7,11.5 C6.17157288,11.5 5.5,12.1715729 5.5,13 L3,13 C2.44771525,13 2,12.5522847 2,12 L2,2 C2,1.44771525 2.44771525,1 3,1 L5.5,1 Z M4.402,2.499 L3.5,2.499 L3.5,6 L5,6 L5,7.5 L3.5,7.5 L3.5,11.499 L4.402,11.499 L4.46706391,11.3917355 C4.96982923,10.6015566 5.83218191,10.0625441 6.82372721,10.0050927 L7,10 C8.06512059,10 9.00059634,10.5550755 9.53293609,11.3917355 L9.597,11.499 L10.5,11.499 L10.5,7.5 L9,7.5 L9,6 L10.5,6 L10.5,2.499 L9.597,2.499 L9.53293609,2.60826455 C9.03017077,3.39844335 8.16781809,3.93745585 7.17627279,3.99490731 L7,4 C5.93487941,4 4.99940366,3.44492446 4.46706391,2.60826455 L4.402,2.499 Z M8,6 L8,7.5 L6,7.5 L6,6 L8,6 Z"></path></g></svg><p>print hotel voucher</p></p></NavLink>
                                                </div>
                                            </div>
                                            <div className='SignoutBtn' onClick={() => { finishtoken(); setall((prev) => ({ ...prev, ["token"]: "" })) }}>Sign out</div>
                                        </div>}
                                </button>}
                            </nav>
                        </div>
                    </div>
                    <div className='downnav flexa'>
                        <div className='flightResultways flexa' onClick={() => { buttonRotate("ways"); }}>
                            <p>{ways == "one" ? "One way" : "Round trip"}</p>
                            <svg width="14" height="9" fill="currentColor" className={`t-all ml-3 ${rotateButton["ways"] ? "rotateButtonzero" : "rotateButtonOneNinty"}`} style={{ color: "rgb(153, 153, 153)", transform: "rotate(-180deg)" }}><g fill="none" fillRule="evenodd"><path d="M15 12H-1V-4h16z"></path><path stroke="#FFF" strokeWidth="0.5" fill="currentColor" d="M11.59 8L7 3.42 2.41 8 1 6.59l6-6 6 6z"></path></g></svg>
                            {rotateButton["ways"] && <div className='flightResultwaysPop'>
                                <p onClick={() => { setways("one"); }} className='flexja hov'>
                                    {ways == "one" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
                                    <p className='wayChooserPtext'>&nbsp;&nbsp; One Way</p>
                                </p>
                                <p onClick={() => { setways("two"); }} className='flexja hov' >
                                    {ways == "two" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
                                    <p className='wayChooserPtext'>&nbsp;&nbsp; Round trip</p>
                                </p>
                            </div>}
                        </div>
                        <div className='flightResultInOut flexa'>
                            <input className='flightResultIn flexja' value={`${flightResultIn.name}-${flightResultIn.fname}`} onClick={() => { buttonRotate("flightIn"); }} />
                            {rotateButton["flightIn"] && <div className='flightInData flightResultInData flexa flexc'>
                                {objdropdowncity.map((item) => (
                                    <div className='slidee flexja' onClick={() => { setflightResultIn(prev => ({ ...prev, name: item.name, fname: item.fname })); buttonRotateAllFalse() }}>
                                        <p>{item.name}</p>
                                        <h4>{item.fname} {item.lname}</h4>
                                    </div>
                                ))}
                            </div>
                            }
                            <svg onClick={() => { swaplocations(); buttonRotateAllFalse() }} width="16" height="14" data-testid="modifySwap" className="c-pointer"> <g transform="translate(0 -1)" fill="none" fillRule="evenodd"> <g fill="#ED6521"> <path d="M3.556 7L0 11l3.556 4v-3h6.222v-2H3.556V7zM16 5l-3.556-4v3H6.222v2h6.222v3L16 5z"></path> </g> </g> </svg>
                            <input className='flightResultOut flexja' value={`${flightResultOut.name}-${flightResultOut.fname}`} onClick={() => { buttonRotate("flightOut"); }} />
                            {rotateButton["flightOut"] && <div className='flightInData flightResultOutData flexa flexc'>
                                {objdropdowncity.map((item) => (
                                    <div className='slidee flexja' onClick={() => { setflightResultOut(prev => ({ ...prev, name: item.name, fname: item.fname })); buttonRotateAllFalse() }}>
                                        <p>{item.name}</p>
                                        <h4>{item.fname} {item.lname}</h4>
                                    </div>
                                ))}
                            </div>
                            }
                        </div>
                        <div className='flightResultLeftDatePicker flexa' onClick={() => { buttonRotate("datego") }}>
                            <div className='datesGoing flightResultdatesGoing'>{`${flightResultdaygo}, ${flightResultmonthgo} ${flightResultdatego}`}</div>
                            {rotateButton["datego"] && <Calendar minDate={new Date()} onChange={(date) => { setflightResultdatego(date.getDate()); setcalenderdate(date); setflightResultdaygo(days[date.getDay()]); setflightResultmonthgo(months[date.getMonth()]); }} value={flightResultdatego} className="calendarForGoing flightResultcalendarGoing " />}
                        </div>
                        <div className='flightResultRightDatePicker blur flexa'>
                            Return
                        </div>
                        <div className='flightResultTraveller flexa' >
                            <div className='travellerdata flexa' onClick={() => { buttonRotate("traveller") }}>{`${travellersCount} Travellers`}</div>
                            <svg onClick={() => { buttonRotate("traveller") }} width="14" height="9" fill="currentColor" className={`t-all ml-3 ${rotateButton["traveller"] ? "rotateButtonzero" : "rotateButtonOneNinty"}`} style={{ color: "rgb(153, 153, 153)", transform: "rotate(-180deg)" }}><g fill="none" fillRule="evenodd"><path d="M15 12H-1V-4h16z"></path><path stroke="#FFF" strokeWidth="0.5" fill="currentColor" d="M11.59 8L7 3.42 2.41 8 1 6.59l6-6 6 6z"></path></g></svg>
                            {rotateButton["traveller"] &&
                                <div className='peopleChooser flightResultPeopleChooser flexa'>
                                    <div className='Adults flex'>
                                        <div>
                                            <h3>Adults</h3>
                                            <h5>(12+ years)</h5>
                                        </div>
                                        <div className='peopleCounters flexja'>
                                            <button className='flexja min' onClick={() => setadult(adult - 1)} disabled={adult == 1} >-</button>
                                            <h4 className='flexja'>{adult}</h4>
                                            <button className='flexja' onClick={() => setadult(adult + 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className='Children flex'>
                                        <div>
                                            <h3>Children</h3>
                                            <h5>(2 - 12 yrs)</h5>
                                        </div>
                                        <div className='peopleCounters flexja'>
                                            <button className='flexja min' onClick={() => setchildren(children - 1)} disabled={children == 0} >-</button>
                                            <h4 className='flexja'>{children}</h4>
                                            <button className='flexja' onClick={() => setchildren(children + 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className='Infants flex'>
                                        <div>
                                            <h3>Infants</h3>
                                            <h5>(Below 2 yrs)</h5>
                                        </div>
                                        <div className='peopleCounters flexja'>
                                            <button className='flexja min' onClick={() => setinfant(infant - 1)} disabled={infant == 0} >-</button>
                                            <h4 className='flexja'>{infant}</h4>
                                            <button className='flexja' onClick={() => setinfant(infant + 1)}>+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => { settravellersCount(adult + children + infant); buttonRotateAllFalse() }}>Submit</button>
                                </div>
                            }
                        </div>
                        <button className='flightResultSubmitMain' onClick={() => { forwardRoute(); }}>Submit</button>
                    </div>
                </div>
            </nav>
            {pageLoader &&
                <div className='MainPageFlightResult flex'>
                    <div className='leftSortingComp flex flexc'>
                        <div className='stops flexa' onClick={() => { filterbuttonRotate("stops") }}>
                            <p>Stops</p>
                            <svg width="14" height="9" fill="currentColor" className={`t-all ml-3 ${filterPopup["stops"] ? "rotateButtonzero" : "rotateButtonOneNinty"}`} style={{ color: "rgb(153, 153, 153)", transform: "rotate(-180deg)" }}><g fill="none" fillRule="evenodd"><path d="M15 12H-1V-4h16z"></path><path stroke="#FFF" strokeWidth="0.5" fill="currentColor" d="M11.59 8L7 3.42 2.41 8 1 6.59l6-6 6 6z"></path></g></svg>
                        </div>
                        {filterPopup["stops"] &&
                            <div className='filterPopupstops flex flexc'>
                                <label onClick={() => { airlineSelectorwithvalue("stops", 0) }} for="non-stop" className='flex'><div className='flexa'><input type='checkbox' id='non-stop' checked={filter["stops"] == 0} /><p>Non-stop</p></div></label>
                                <label onClick={() => { airlineSelectorwithvalue("stops", 1) }} for="1-stop" className='flex'><div className='flexa'><input type='checkbox' id='1-stop' checked={filter["stops"] == 1} /><p>1 stop</p></div></label>
                                <label onClick={() => { airlineSelectorwithvalue("stops", 2) }} for="2-stop" className='flex'><div className='flexa'><input type='checkbox' id='2-stop' checked={filter["stops"] == 2} /><p>2 stop</p></div></label>
                            </div>}
                        <div className='wayprice flexa' onClick={() => { filterbuttonRotate("wayprice") }}>
                            <p>One-way price</p>
                            <svg width="14" height="9" fill="currentColor" className={`t-all ml-3 ${filterPopup["wayprice"] ? "rotateButtonzero" : "rotateButtonOneNinty"}`} style={{ color: "rgb(153, 153, 153)", transform: "rotate(-180deg)" }}><g fill="none" fillRule="evenodd"><path d="M15 12H-1V-4h16z"></path><path stroke="#FFF" strokeWidth="0.5" fill="currentColor" d="M11.59 8L7 3.42 2.41 8 1 6.59l6-6 6 6z"></path></g></svg>
                        </div>
                        {filterPopup["wayprice"] &&
                            <div className='filterPopupwayprice flex flexc'>
                                <p>Up to ₹{onewayPrice}</p>
                                <input type='range' min="1127" max="2500" value={onewayPricewithoutcomma()} onChange={(e) => { onewayPricewithcomma(e.target.value); }} />
                                <div className='flexa'><p>₹1,127</p><p>₹2,500</p></div>
                            </div>}
                        <div className='airline flexa' onClick={() => { filterbuttonRotate("airline") }}>
                            <p>Airlines</p>
                            <svg width="14" height="9" fill="currentColor" className={`t-all ml-3 ${filterPopup["airline"] ? "rotateButtonzero" : "rotateButtonOneNinty"}`} style={{ color: "rgb(153, 153, 153)", transform: "rotate(-180deg)" }}><g fill="none" fillRule="evenodd"><path d="M15 12H-1V-4h16z"></path><path stroke="#FFF" strokeWidth="0.5" fill="currentColor" d="M11.59 8L7 3.42 2.41 8 1 6.59l6-6 6 6z"></path></g></svg>
                        </div>
                        {filterPopup["airline"] &&
                            <div className='filterPopupairline flex flexc'>
                                <label onClick={() => { airlineSelector("AI") }} for="Air-india" className='flexa'><div className='flexa'><input type='checkbox' id='Air-india' checked={filter["AI"]} /><p>Air India</p></div>₹21,827</label>
                                <label onClick={() => { airlineSelector("I5") }} for="Air-india-express" className='flexa'><div className='flexa'><input type='checkbox' id='Air-india-express' checked={filter["I5"]} /><p>Air India Express</p></div>₹14,748</label>
                                <label onClick={() => { airlineSelector("QP") }} for="Akasa-air" className='flexa'><div className='flexa'><input type='checkbox' id='Akasa-air' checked={filter["QP"]} /><p>Akasa Air</p></div>₹18,940</label>
                                <label onClick={() => { airlineSelector("6E") }} for="Indigo" className='flexa'><div className='flexa'><input type='checkbox' id='Indigo' checked={filter["6E"]} /><p>Indigo</p></div>₹9,127</label>
                                <label onClick={() => { airlineSelector("SG") }} for="Spicejet" className='flexa'><div className='flexa'><input type='checkbox' id='Spicejet' checked={filter["SG"]} /><p>SpiceJet</p></div>₹19,429</label>
                                <label onClick={() => { airlineSelector("UK") }} for="Vistara" className='flexa'><div className='flexa'><input type='checkbox' id='Vistara' checked={filter["UK"]} /><p>Vistara</p></div>₹24,798</label>
                                <label onClick={() => { airlineSelector("S5") }} for="Star-air" className='flexa'><div className='flexa'><input type='checkbox' id='Star-air' checked={filter["S5"]} /><p>Star Air</p></div>₹8,523</label>
                            </div>}
                        <div className='duration flexa' onClick={() => { filterbuttonRotate("duration") }}>
                            <p>Trip duration</p>
                            <svg width="14" height="9" fill="currentColor" className={`t-all ml-3 ${filterPopup["duration"] ? "rotateButtonzero" : "rotateButtonOneNinty"}`} style={{ color: "rgb(153, 153, 153)", transform: "rotate(-180deg)" }}><g fill="none" fillRule="evenodd"><path d="M15 12H-1V-4h16z"></path><path stroke="#FFF" strokeWidth="0.5" fill="currentColor" d="M11.59 8L7 3.42 2.41 8 1 6.59l6-6 6 6z"></path></g></svg>
                        </div>
                        {filterPopup["duration"] &&
                            <div className='filterPopupduration flex flexc'>
                                <div className='flexa'><p>{tripdurationmin} hours</p><p>{tripdurationmax} hours</p></div>
                                <MultiRangeSlider min={1} max={10} minValue={tripdurationmin} ruler="false" label="false" maxValue={tripdurationmax} step={1} onInput={(e) => { settripdurationmin(e.minValue); settripdurationmax(e.maxValue); }} className='multirangelayover' />
                            </div>
                        }
                    </div>
                    <div className='FlightResultDataRender'>
                        <nav className='flightResultsortingNav flexa'>
                            <div>Airlines</div>
                            <div className={flightResultsortingnav["departureTime"] ? "activesortingnavColor" : flightResultsortingnav["departureTime"] == false ? "activesortingnavColor" : null} onClick={() => { sortingnav("departureTime") }}>Departure &nbsp;{(flightResultsortingnav["departureTime"] == false && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" style={{ transform: `rotate(${-180}deg)` }}><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}{(flightResultsortingnav["departureTime"] == true && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" ><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}</div>
                            <div className={flightResultsortingnav["duration"] ? "activesortingnavColor" : flightResultsortingnav["duration"] == false ? "activesortingnavColor" : null} onClick={() => { sortingnav("duration") }}>Duration &nbsp;{(flightResultsortingnav["duration"] == false && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" style={{ transform: `rotate(${-180}deg)` }}><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}{(flightResultsortingnav["duration"] == true && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" ><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}</div>
                            <div className={flightResultsortingnav["arrivalTime"] ? "activesortingnavColor" : flightResultsortingnav["arrivalTime"] == false ? "activesortingnavColor" : null} onClick={() => { sortingnav("arrivalTime") }}>Arrival &nbsp;{(flightResultsortingnav["arrivalTime"] == false && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" style={{ transform: `rotate(${-180}deg)` }}><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}{(flightResultsortingnav["arrivalTime"] == true && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" ><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}</div>
                            <div className={flightResultsortingnav["ticketPrice"] ? "activesortingnavColor" : flightResultsortingnav["ticketPrice"] == false ? "activesortingnavColor" : null} onClick={() => { sortingnav("ticketPrice") }}>Price &nbsp;{(flightResultsortingnav["ticketPrice"] == false && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" style={{ transform: `rotate(${-180}deg)` }}><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}{(flightResultsortingnav["ticketPrice"] == true && <svg viewBox="0 0 5 8" fill="currentColor" width="7px" height="12px" ><path d="M0 4.688l2.073.006L2.08 0l.823.013.005 4.679L5 4.695 2.483 8z" fillRule="evenodd"></path></svg>)}</div>
                            <div className='flexa'>Smart@ &nbsp;
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </nav>
                        <div className='flightResultData'>
                            {dataa.map((item, index) => (filter[`${item.flightID[0]}${item.flightID[1]}`] && <div className='countvisibility'>{count++}</div> && (
                                <div className='flightResultcardOuter flexja flexc'>
                                    <div className='flightResultcardInner flexa'>
                                        <div className='flightResultcardheader flexa flexc g20'>
                                            <div className='flexja g10'>
                                                <img src={logofinder(item)} />
                                                <div >
                                                    <p className='flightName'>{airlineNamefinder(item)}</p>
                                                    <p className='flightid'>{`${item.flightID[0]}${item.flightID[1]}-${item.flightID[item.flightID.length - 3] + item.flightID[item.flightID.length - 2] + item.flightID[item.flightID.length - 1]}`}</p>
                                                </div>
                                            </div>
                                            <div className='flightdetails' onClick={() => { togglecarddetails(`${index}`) }}>{togglecardfulldetails[`${index}`] ? "Hide details" : "Flight details"}</div>
                                        </div>
                                        <div className='flightResultdepartureTime'>{item.departureTime}</div>
                                        <div className='flightResultDuration flexja flexc'><p className='flightresultduration'>{item.duration}h 00m</p><div className='flightdurationandstopSeperator flexja'><div></div></div><p className='flightresultstops'>{item.stops == 0 ? "Non-stop" : item.stops == 1 ? item.stops + " Stop" : item.stops + " Stops"}</p></div>
                                        <div className='fligthResultArrivalTime'>{item.arrivalTime}</div>
                                        <div className='flightprice'>₹{numberwithComma(item.ticketPrice)}</div>
                                        <div className='flightbookbutton flexja' onClick={() => { navigateToFlightInfo(item._id) }}>Book</div>
                                    </div>
                                    {togglecardfulldetails[`${index}`] &&
                                        <div className='flightresultCardFullDetails'>
                                            <div className='flightresultCardFullDetailsHeader flexa'>
                                                <div className='flexja g20'>
                                                    <div className='flexja g20'>
                                                        {objdropdowncity.map((itemm) => (itemm.name == item.source ? `${itemm.fname.match(/^([^,]+)/)[1]}` : ""))} → {objdropdowncity.map((itemm) => (itemm.name == item.destination ? `${itemm.fname.match(/^([^,]+)/)[1]}` : ""))}
                                                    </div>
                                                    <div className='cardsmentiondate'>
                                                        {days[dateObject.getDay()]}, {dateObject.getDate()} {months[dateObject.getMonth()]}
                                                    </div>
                                                </div>
                                                <div className='cardpartiallytext'>PARTIALLY REFUNDABLE</div>
                                            </div>
                                            <div className='flightresult-cardInnerDetails flexa'>
                                                <div className='phase1 flexa flexc g5'>
                                                    <img src={logofinder(item)} alt='img' />
                                                    <p>{airlineNamefinder(item)}</p>
                                                    <p className='flightid'>{`${item.flightID[0]}${item.flightID[1]}-${item.flightID[item.flightID.length - 3] + item.flightID[item.flightID.length - 2] + item.flightID[item.flightID.length - 1]}`}</p>
                                                </div>
                                                <div className='phase2'>
                                                    <div className='flex flexc g2'>
                                                        <h2><span>{item.source}</span> {item.departureTime}</h2>
                                                        <p>{days[dateObject.getDay()]}, {dateObject.getDate()} {months[dateObject.getMonth()]} {dateObject.getFullYear()}</p>
                                                    </div>
                                                </div>
                                                <div className='phase3 flexja g5 flexc'>
                                                    <svg width="20" height="20"><g fill="#4D4D4D" fill-rule="evenodd"><path d="M19.202 6.102c-1.055-2.459-2.847-4.246-5.325-5.304A9.83 9.83 0 009.984 0a9.728 9.728 0 00-3.882.798C3.643 1.853 1.844 3.64.787 6.102A9.732 9.732 0 000 9.984c0 1.356.258 2.659.787 3.893 1.057 2.462 2.857 4.26 5.315 5.314a9.728 9.728 0 003.882.798c1.355 0 2.654-.27 3.892-.798 2.48-1.057 4.271-2.856 5.326-5.314A9.782 9.782 0 0020 9.984a9.724 9.724 0 00-.798-3.882zm-1.597 8.3a8.773 8.773 0 01-3.215 3.203 8.613 8.613 0 01-4.406 1.181c-1.192 0-2.33-.23-3.412-.7-1.083-.47-2.017-1.088-2.8-1.87-.781-.781-1.404-1.725-1.87-2.81a8.61 8.61 0 01-.688-3.422c0-1.586.39-3.054 1.17-4.396a8.778 8.778 0 013.204-3.204 8.546 8.546 0 014.396-1.181c1.585 0 3.06.396 4.406 1.18a8.8 8.8 0 013.215 3.205 8.547 8.547 0 011.181 4.396 8.629 8.629 0 01-1.18 4.417z" fill-rule="nonzero"></path><path d="M10.618 9.902V4.237c0-.339-.295-.612-.634-.612a.616.616 0 00-.602.612V9.99c0 .011.022.055.022.088a.572.572 0 00.164.492l3.27 3.27a.622.622 0 00.842 0 .59.59 0 000-.854l-3.062-3.083z"></path></g></svg>
                                                    <p>{item.duration}h 00m</p>
                                                </div>
                                                <div className='phase4'>
                                                    <h2><span>{item.destination}</span> {item.arrivalTime}</h2>
                                                    <p>{days[dateObject.getDay()]}, {dateObject.getDate()} {months[dateObject.getMonth()]} {dateObject.getFullYear()}</p>
                                                </div>
                                                <div className='phase5'>
                                                    <p>Check-in baggage</p>
                                                    <p>Cabin baggage</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )))}
                            {message()}
                        </div>
                    </div>
                </div>
            }
            {!pageLoader &&
                <div className='loadershow'>
                    ...LoadingPage
                </div>
            }
        </div>

    )
}

