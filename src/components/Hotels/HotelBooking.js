import React, { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import './HotelBooking.css'
import { Base_URL, Project_ID } from "../Constants";
import { dropDown, offerSaving, ratingCircle, ratingOwl } from '../../Resources/Icons'
import { useAuthContext } from '../ContextAllData'
import { CgClose } from 'react-icons/cg';
export default function HotelBooking() {
    const { setpaymentdone } = useAuthContext()
    const hotelCardInfoLocation = useLocation();
    const searchParams = new URLSearchParams(hotelCardInfoLocation.search);
    let hotelId = searchParams.get("hotelId");
    let datefrom = searchParams.get("dateFrom");
    let dateTo = searchParams.get("dateTo");

    const navigate = useNavigate()
    const inputref = useRef()

    const [phonenumber, setphonenumber] = useState("");
    const [errorcontact, seterrorcontact] = useState(false);
    const [hotelcard, sethotelcard] = useState([])
    const [load, setLoad] = useState(false)
    const [popp, setpopp] = useState({})
    const [details, setdetails] = useState({ dnumber: "", demail: "", dfname: "", dlname: "", dgender: "", dcountry: "", dstate: "", dbillingAddress: "" })

    const pop = (key) => {
        setTimeout(() => {
            setpopp({})
            setpopp((prev) => ({ ...prev, [key]: !popp[key] }))
        }, 100);
    }

    const formatdatefrom = formatDate(datefrom)
    const formatdateto = formatDate(dateTo)
    const datefromString = formatdatefrom;
    const dayfromMatch = datefromString.match(/^(\w{3}),\s(\w{3})\s(\d{1,2}),/);
    const dayfrom = dayfromMatch ? dayfromMatch[1] : null;
    const monthfrom = dayfromMatch ? dayfromMatch[2] : null;
    const datefromdate = dayfromMatch ? dayfromMatch[3] : null;
    const timefrmMatch = datefromString.match(/(\d{1,2}:\d{2}\s[APMapm]{2})$/);
    const timefrom = timefrmMatch ? timefrmMatch[1] : null;

    const datetoString = formatdateto;
    const daytoMatch = datetoString.match(/^(\w{3}),\s(\w{3})\s(\d{1,2}),/);
    const dayto = daytoMatch ? daytoMatch[1] : null;
    const monthto = daytoMatch ? daytoMatch[2] : null;
    const dateto = daytoMatch ? daytoMatch[3] : null;
    const timetoMatch = datetoString.match(/(\d{1,2}:\d{2}\s[APMapm]{2})$/);
    const timeto = timetoMatch ? timetoMatch[1] : null;

    //-----------------------------StartDate and EndDate maker for Post data-----------------------------------

    // const datefromformat = new Date()
    // const datefromformatter = () => {
    //     datefromformat.setDate(+(datefrom.slice(8)))
    //     datefromformat.setMonth(+(datefrom.slice(5, 7)) - 1)
    //     datefromformat.setFullYear(+(datefrom.slice(0, 4)))
    // }
    // function startdate() {
    //     const departureDate = new Date(datefromformat);
    //     const [hours, minutes] = timefrom.split(":");
    //     departureDate.setHours(hours, minutes);
    //     return departureDate;
    //   }

    // const datetoformat = new Date()
    // const datetoformatter = () => {
    //     datetoformat.setDate(+(dateTo.slice(8)))
    //     datetoformat.setMonth(+(dateTo.slice(5, 7)) - 1)
    //     datetoformat.setFullYear(+(dateTo.slice(0, 4)))
    //     console.log(datetoformat)
    // }
    // function enddate() {
    //     const departureDate = new Date(datetoformat);
    //     const [hours, minutes] = timeto.split(":");
    //     departureDate.setHours(hours, minutes);
    //     return departureDate;
    //   }

    //-----------------------------StartDate and EndDate maker for Post data-----------------------------------

    const senddata = async () => {
        try {
          if (phonenumber && details.demail && details.dfname && details.dlname ) {
            const response = await (await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/booking`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                  projectID: Project_ID,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  bookingType: "hotel",
                  bookingDetails: {
                    hotelId: hotelId,
                    startDate: datefrom,
                    endDate: dateTo
                  }
                })
              }
            )).json();
          }
        }
        catch (error) {
          alert(error);
        }
      }

    function formatDate(inputDate) {
        const options = { month: 'short', day: 'numeric', weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: true };
        const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
        return formattedDate;
    }

    function travellerinfo(key, value) {
        setdetails((prev) => ({ ...prev, [key]: value }));
    }

    function numbererror(e) {
        const inputValue = e.target.value;
        const inputElement = e.target;
        if (inputValue.length == 0) {
            inputElement.style.outline = "none";
        } else if (inputValue.length == 10) {
            inputElement.style.outline = "1px solid green";
        } else {
            inputElement.style.outline = "1px solid red";
        }
    }

    function gotopayment() {
        if (phonenumber && details.demail && details.dfname && details.dlname) {
            setpaymentdone(true)
            navigate(`/hotels/results/hotelcardsinfo/hotelBooking/hotelPayment?FirstName=${details.dfname}&Email=${details.demail}&Amount=${Math.floor((hotelcard.rooms[0].costDetails.baseCost) + (hotelcard.rooms[0].costDetails.taxesAndFees) - ((hotelcard.rooms[0].costDetails.baseCost * 20) / 100) - ((hotelcard.rooms[0].costDetails.baseCost * 20) / 100)).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1,')}`);
            senddata()
        }
    }

    const fetchHotelCardInfo = useMemo(async () => {
        try {
            setLoad(false)
            const response = await fetch(`${Base_URL}/hotel/${hotelId}`, { method: "GET", headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJlZWE2ZWM3MjNmN2NkZTA0OTJmNSIsImlhdCI6MTcwNTkxNDQyMywiZXhwIjoxNzM3NDUwNDIzfQ.NsXu4O1WNOfj__A2bSWNhgoazcYlUFMaWeMDp_fPTow', projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json()
            sethotelcard(result.data)
            setLoad(true)
        } catch (error) {
            console.log(error);
        }
    }, [])


    useEffect(() => {
        fetchHotelCardInfo
    }, [])

    return (
        <>
            {load && hotelcard && <div className='hotelBooking'>
                {popp['moreDetailsAboutRoom'] && <div onClick={() => pop('moreDetailsAboutRoom')} className='booking-transparent'></div>}
                {popp['seemore'] && <div onClick={() => pop('seemore')} className='booking-transparent'></div>}
                <div className="wholenav flexja">
                    <nav className='flexa'>
                        <NavLink to='/'>
                            <svg width="107" height="24" viewBox="0 0 310 65" fill="none" color="#214497" className="mr-7"><path d="M249.469 16.3906C243.189 16.3906 240.039 19.1706 240.039 25.4606V49.1506H247.469V25.8206C247.469 23.7506 248.399 22.7506 250.539 22.7506H257.039V16.3906H249.469V16.3906Z" fill="#FF4F17"></path><path d="M264.891 1.59961C262.461 1.59961 260.461 3.59961 260.461 6.09961C260.461 8.59961 262.461 10.5296 264.891 10.5296C267.321 10.5296 269.391 8.52961 269.391 6.09961C269.391 3.66961 267.391 1.59961 264.891 1.59961Z" fill="#FF4F17"></path><path d="M268.61 16.2402H261.25V49.0902H268.61V16.2402Z" fill="#FF4F17"></path><path d="M121.289 42.8804C119.149 42.8804 118.219 42.3104 118.219 40.1704V1.65039H110.789V40.1704C110.789 46.6704 114.429 49.2404 120.139 49.2404H124.069V42.8804H121.289V42.8804Z" fill="#FF4F17"></path><path d="M209.119 16.2695C202.839 16.2695 199.689 19.0495 199.689 25.3395V49.1195H207.119V25.6995C207.119 23.6295 208.049 22.6295 210.189 22.6295H216.689V16.2695H209.119Z" fill="#FF4F17"></path><path d="M228.33 16.2998V8.08984H220.9V40.0798C220.9 46.2898 224.11 49.1498 230.33 49.1498H235.9V42.7898H231.4C229.4 42.7898 228.33 42.0798 228.33 40.0798V22.6598H235.9V16.2998H228.33V16.2998Z" fill="#FF4F17"></path><path d="M274.82 16.5006V63.3706H282.25V46.3006C284.91 48.1406 288.13 49.2306 291.6 49.2306C300.67 49.2306 308.02 41.8806 308.02 32.8106C308.02 23.7406 300.67 16.3906 291.6 16.3906C288.12 16.3906 284.9 17.4806 282.25 19.3206V16.5006H274.82V16.5006ZM282.25 32.8106C282.25 27.6406 286.44 23.4606 291.6 23.4606C296.76 23.4606 300.95 27.6506 300.95 32.8106C300.95 37.9706 296.76 42.1606 291.6 42.1606C286.44 42.1606 282.25 37.9706 282.25 32.8106V32.8106Z" fill="#FF4F17"></path><path d="M156.92 32.1006C156.92 22.1006 150.21 16.3906 141.42 16.3906C131.57 16.3906 125.5 23.2506 125.5 32.7406C125.5 42.2306 132.21 49.2406 141.57 49.2406C149.85 49.2406 154.21 45.5306 156.28 39.3906H148.28C147.07 41.7506 144.78 42.8206 141.42 42.8206C136.99 42.8206 133.35 40.0406 133.07 35.0406H156.78C156.92 33.4706 156.92 32.7506 156.92 32.1106V32.1006ZM133.14 29.7406C133.78 25.3806 136.85 22.7406 141.64 22.7406C146.43 22.7406 149.07 25.2406 149.49 29.7406H133.14Z" fill="#FF4F17"></path><path d="M98.8005 37.9506C97.5905 41.3806 95.3005 42.8106 91.8705 42.8106C86.2305 42.8106 83.8005 38.3806 83.8005 32.7406C83.8005 27.1006 86.5805 22.7406 92.0105 22.7406C95.4405 22.7406 97.7205 24.5306 98.7905 27.6006H106.72C104.86 20.1006 99.2905 16.3906 91.8705 16.3906C81.8705 16.3906 76.2305 23.5306 76.2305 32.7406C76.2305 42.7406 82.8705 49.2406 91.8705 49.2406C100.87 49.2406 105.22 44.1706 106.72 37.9606H98.7905L98.8005 37.9506Z" fill="#FF4F17"></path><path d="M56.6095 17.7393C44.1095 26.8793 33.3295 38.8793 23.6895 48.9493C22.9795 49.6593 22.0495 50.1593 21.0495 50.1593C19.8395 50.1593 18.9095 49.4493 18.0495 48.1593C15.5495 44.4493 11.7695 35.4493 10.0495 31.5193C8.68954 28.3093 9.40954 25.6593 12.6195 24.3093C15.8295 23.0193 19.3995 22.8093 20.2595 26.4493C20.2595 26.4493 21.8995 32.8093 22.3995 34.6593C32.3295 25.4493 44.5395 15.6693 54.8895 9.66929C52.3195 4.80929 47.2495 1.5293 41.4695 1.5293H16.9795C8.54954 1.5293 1.76953 8.30929 1.76953 16.6693V41.2293C1.76953 49.5793 8.54954 56.3693 16.9795 56.3693H41.4695C49.8195 56.3693 56.6095 49.5893 56.6095 41.2293V17.7393V17.7393Z" fill="#FF4F17"></path><path d="M186.059 16.5006V19.3206C183.399 17.4806 180.179 16.3906 176.709 16.3906C167.639 16.3906 160.289 23.7406 160.289 32.8106C160.289 41.8806 167.639 49.2306 176.709 49.2306C180.189 49.2306 183.409 48.1406 186.059 46.3006V49.0906H193.489V16.5006H186.059ZM176.709 42.1606C171.539 42.1606 167.359 37.9706 167.359 32.8106C167.359 27.6506 171.549 23.4606 176.709 23.4606C181.869 23.4606 186.059 27.6506 186.059 32.8106C186.059 37.9706 181.869 42.1606 176.709 42.1606Z" fill="#FF4F17"></path></svg>
                        </NavLink>
                    </nav>
                </div>
                <div className='main-section flexja'>
                    <div className='main-section-left flexc'>
                        <div className='hotelinfo-FirstPart flexa g20'>
                            <div className='flightinfo-1-logo flexja'>1</div>
                            <h1>Review your itinerary</h1>
                        </div>
                        <div className='hotelinfo-left-card'>
                            <div className='hotelinfo-left-card-sec1 flexBet'>
                                <div className='flexc g20'>
                                    <p>{hotelcard.amenities.length}-star hotel</p>
                                    <h1>{hotelcard.name} {hotelcard.location}</h1>
                                    <div className='flexY'><div>{ratingOwl}</div> &nbsp; <div>{ratingCircle}{ratingCircle}{ratingCircle}{ratingCircle}{ratingCircle}</div></div>
                                </div>
                                <div className='img'><img src={hotelcard.images[0]} /></div>
                            </div>
                            <div className='hotelinfo-left-card-sec2 '>
                                <div className='flex'>
                                    <div className='hotelinfo-left-card-sec2-travell flexBet'>
                                        <div>
                                            <p>Check-in</p>
                                            <h2>{datefromdate}&nbsp;{monthfrom}</h2>
                                            <p>{dayfrom}, {timefrom}</p>
                                        </div>
                                        <p>1 night</p>
                                        <div>
                                            <p>Check-in</p>
                                            <h2>{dateto}&nbsp;{monthto}</h2>
                                            <p>{dayto}, {timeto}</p>
                                        </div>
                                    </div>
                                    <div className='hotelinfo-left-card-sec2-rooms'>
                                        <div>
                                            <p>Rooms & Guests</p>
                                            <div className='flexY g10'><h1>1 Room, 2 Guests</h1><h5 onClick={() => pop('guestInfo')} style={{ color: 'rgba(0, 0, 255, 0.732)' }}>Details</h5><h5 style={{ color: 'rgba(0, 0, 255, 0.732)' }}>{dropDown}</h5>{popp['guestInfo'] && <div onClick={() => pop('guestInfo')} className='guestinfopopup'><CgClose style={{ fontSize: '25px', backgroundColor: 'black', color: 'white', borderRadius: '50%', padding: '3px' }} /><h1 style={{ padding: '10px 20px' }}>Guest information</h1><div className='flexBet' style={{ padding: '10px 20px', fontSize: '16px' }}><p>Room {hotelcard.rooms.length}</p><p>{hotelcard.houseRules.guestProfile.unmarriedCouplesAllowed && 2} Adults</p></div></div>}</div>
                                            <p>{hotelcard.houseRules.guestProfile.unmarriedCouplesAllowed && 2} Adults</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='hotelinfo-left-card-sec3'>
                            <h3>{hotelcard.rooms[0].roomType}</h3>
                            <div className='flexY g20'>
                                <img src={hotelcard.images[1]} />
                                <div><p>Room only</p><p style={{ color: 'rgba(0, 0, 255, 0.732)' }} onClick={() => pop('moreDetailsAboutRoom')}>See more details</p></div>
                                {popp['moreDetailsAboutRoom'] && <div className='moreDetailsAboutRoom ' style={{ boxShadow: 'rgba(0, 0, 0, 0.6) 0px 6px 12px, rgba(0, 0, 0, 0.04) 0px 2px 16px' }}>
                                    <div className='hotelinfo-left-card-sec3 flexc g20'>
                                        <CgClose onClick={() => pop('moreDetailsAboutRoom')} style={{ fontSize: '25px', backgroundColor: 'black', color: 'white', borderRadius: '50%', padding: '3px' }} />
                                        <h3>{hotelcard.rooms[0].roomType}</h3>
                                        <div className='flexc g20'>
                                            <img src={hotelcard.images[1]} />
                                            <div><p>Room only</p></div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className='hotelinfo-left-card-sec4 '>
                            <h3>Cancellation policy</h3>
                            <p>{hotelcard.rooms[0].cancellationPolicy}</p>
                        </div>
                        <div className='hotelinfo-left-card-sec5'>
                            <h3>Booking policy</h3>
                            <div className='flexXY g20'>
                                <div className='flightinfo-3-logo flexja'>18</div>
                                <p>{hotelcard.childAndExtraBedPolicy.extraBedProvidedForChild === true ? 'Guests below 18 years of age allowed' : 'Guests below 18 years of age not allowed'}</p>
                            </div>
                            <p style={{ color: 'rgba(0, 0, 255, 0.732)', paddingTop: '10px' }} onClick={() => pop('seemore')}>See more</p>
                            {popp['seemore'] && <div className='seemore ' style={{ borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.6) 0px 6px 12px, rgba(0, 0, 0, 0.04) 0px 2px 16px' }}>
                                <div className='hotelinfo-left-card-sec3 flexc g20'>
                                    <CgClose onClick={() => pop('seemore')} style={{ fontSize: '25px', backgroundColor: 'black', color: 'white', borderRadius: '50%', padding: '3px' }} />
                                    <h3>Booking policy</h3>
                                </div>
                            </div>}
                        </div>
                        <div className='flightinfo-ThirdPart flexa g20'>
                            <div className='flightinfo-3-logo flexja'>3</div>
                            <h1>Guest details</h1>
                        </div>

                        <div className='hotelInfo-guestdetails flexj flexc g20'>
                            <div className='hotelInfo-guestdiv flexa g20'>
                                <input className='hotelInfo-emailInput' type='email' placeholder='Email Address' onClick={() => { pop("emailaddress") }} value={details.demail} onChange={(e) => { travellerinfo("demail", e.target.value) }} />
                                <input type="number" className='hotelInfo-numberInput' onClick={() => { pop("mobile") }} placeholder='Enter mobile number' ref={inputref} value={phonenumber} onChange={(e) => { seterrorcontact(false); setphonenumber(e.target.value); numbererror(e) }} />

                            </div>
                            <p>Booking details will be sent to this number and email address</p>
                            <div className='hotelInfo-guestdiv flexa g20'>
                                <input type='text' className='fname' placeholder='First name' value={details.dfname} onChange={(e) => { travellerinfo("dfname", `${e.target.value}`) }} onClick={() => { pop("fname") }} />
                                <input type='text' className='lname' placeholder='Last name' value={details.dlname} onChange={(e) => { travellerinfo("dlname", `${e.target.value}`) }} onClick={() => { pop("lname") }} />
                            </div>
                            {errorcontact && <p className='errorcontact'>fill the form correctly</p>}
                            <div className='hotelInfo-buttondiv flex'>
                                <button onClick={() => { gotopayment(); }}>Continue to Payment</button>
                            </div>
                        </div>

                    </div>
                    <div className='main-section-right flexX'>
                        <div className='main-section-right-sec1'>
                            <div className='main-section-right-sec1-pricing flexc'>
                                <h1>Price breakup</h1>
                                <div className='flexBet'><p>1 room x 1 night</p><p>₹{Math.floor(hotelcard.rooms[0].costDetails.baseCost).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1,')}</p></div>
                                <div className='flexBet'><p>Hotel taxes</p><p>₹{(hotelcard.rooms[0].costDetails.taxesAndFees)}</p></div>
                                <div className='flexBet'><p>Property discount</p><p style={{ color: '#11a670' }}>-₹{Math.floor(hotelcard.rooms[0].costDetails.baseCost / 40)}</p></div>
                                <div className='flexBet'><p>Coupon Code (CTWINTER)</p><p style={{ color: '#11a670' }}>-{Math.floor((hotelcard.rooms[0].costDetails.baseCost * 20) / 100)}</p></div>
                            </div>
                            <div className='main-section-right-sec1-total'>
                                <div className='flexBet'><p style={{ color: '#000' }}>Total</p><h1>₹{Math.floor((hotelcard.rooms[0].costDetails.baseCost) + (hotelcard.rooms[0].costDetails.taxesAndFees) - ((hotelcard.rooms[0].costDetails.baseCost * 20) / 100) - ((hotelcard.rooms[0].costDetails.baseCost * 20) / 100)).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1,')}</h1></div>
                                <p>1 room . 1 night</p>
                            </div>
                            <div className='main-section-right-sec1-offersaving flexXY'>
                                {offerSaving} &nbsp; <p style={{ color: '#11a670' }}>Total saving of ₹{Math.floor((hotelcard.rooms[0].costDetails.baseCost * 20) / 100 + (hotelcard.rooms[0].costDetails.baseCost / 40)).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1,')}!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}
