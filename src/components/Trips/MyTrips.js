import React, { useEffect, useState } from 'react'
import { Project_ID, getAirlineInfo } from '../Constants';
import { clockIcon, ratingCircle, ratingOwl } from '../../Resources/Icons';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import './MyTrips.css'
export default function MyTrips() {
    const [tripdata, settripdata] = useState([])
    const [toggle, settoggle] = useState(false)
    const senddata = async () => {
        try {
            const response = await (await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/booking`,
                {
                    method: "Get",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                        projectID: Project_ID,
                        "Content-Type": "application/json",
                    },
                }
            )).json();
            console.log(response)
            settripdata(response.data)
        }
        catch (error) {
            alert(error);
        }
    }

    function formatDate(inputdate) {
        const options = { month: 'short', day: 'numeric', weekday: 'short' };
        const formattedDate = new Date(inputdate).toLocaleDateString('en-US', options);
        return formattedDate;
    }
    // const formatdatefrom = formatDate(date)

    useEffect(() => {
        senddata()
    }, [])
    return (
        <div style={{ width: '70vw' }}>
            <h1 className='trips-heading'>Booking history</h1>
            <div className='trips-filter-btn'>
                <button className={toggle ? 'activeBtn' : 'trips-button'} onClick={() => settoggle(true)}>Flight</button> &nbsp;&nbsp;
                <button className={!toggle ? 'activeBtn' : 'trips-button'} onClick={() => settoggle(false)}>Hotels</button>
            </div>

            {/* --------------------Flight section------------------------ */}
            {tripdata && toggle && tripdata.map((item, index) => item.booking_type === 'flight' && (
                <div className="trip-card-flight-details">
                    <div className="trip-card-flight-details-header flexBet">
                        <div className="trip-card-header-head1 flexXY">
                            <h4>{item.flight.source} <HiOutlineArrowNarrowRight /> {item.flight.destination}</h4>
                            <p>{formatDate(item.created_at)}</p>
                        </div>
                        <div className="trip-card-header-head2 flexXY">
                            <h6>Partially Refundable</h6>
                        </div>
                    </div>
                    <div className="trip-card-container-details-airline flexY g20">
                        <div className="trip-card-container-details-sec1 flexBet">
                            <div>
                                <img src={getAirlineInfo(item.flight.flightID.slice(0, 2)).logoSrc} />
                            </div>
                            <div className="trip-card-container-airline-name">
                                <h5>{getAirlineInfo(item.flight.flightID.slice(0, 2)).airlineName}</h5>
                            </div>
                            <div className="flexC">
                                <h6>{item.flight.flightID.slice(0, 2)}-{item.flight.flightID.slice(13, 16)}</h6>
                                <h5>Economy</h5>
                            </div>
                        </div>
                        <div className="trip-card-expanded flexBet">
                            <div className="trip-card-expanded-sec1">
                                <div className="flexY g5"><h3>{item.flight.source}</h3><h4>{item.flight.departureTime}</h4></div>
                                <p>{formatDate(item.start_date)}</p>
                            </div>
                            <div className="trip-card-expanded-sec2">
                                {clockIcon}
                                <p>{item.flight.duration}h {item.flight.duration}m</p>
                            </div>
                            <div className="trip-card-expanded-sec3">
                                <div className="flexY g5"><h3>{item.flight.destination}</h3><h4>{item.flight.arrivalTime}</h4></div>
                                <p>{formatDate(item.end_date)}</p>
                            </div>
                            <div className="trip-card-expanded-sec4">
                                <p>Check-in baggage</p>
                                <p>Cabin baggage</p>
                            </div>
                            <div className="trip-card-expanded-sec5">
                                <p>15 kg / adult</p>
                                <p>7 kg / adult</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {/* --------------------Flight section------------------------ */}

            {/* --------------------Hotel section------------------------ */}
            <div className='hotel-trip flex'>
            {tripdata && !toggle && tripdata.map((item, index) => item.booking_type === 'hotel' && (
            <div className='hotelinfo-left-card'>
                <div className='hotelinfo-left-card-sec1 flexBet'>
                    <div className='flexc g20'>
                        {/* <p>{hotelcard.amenities.length}-star hotel</p> */}
                        <h1>{item.hotel.name} {item.hotel.location}</h1>
                        <div className='flexY'><div>{ratingOwl}</div> &nbsp; <div>{ratingCircle}{ratingCircle}{ratingCircle}{ratingCircle}{ratingCircle}</div></div>
                    <div className=''>Status : {item.status}</div>
                    </div>
                </div>
                <div className='hotelinfo-left-card-sec2 '>
                    <div className='flex'>
                        <div className='hotelinfo-left-card-sec2-travell flexBet'>
                            <div>
                                <p>Check-in</p>
                                <h2>{formatDate(item.start_date)}</h2>
                            </div>
                            <p>1 night</p>
                            <div>
                                <p>Check-out</p>
                                <h2>{formatDate(item.end_date)}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
                </div>
            {/* --------------------Hotel section------------------------ */}

        </div>
    )
}
