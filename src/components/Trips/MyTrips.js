import React, { useEffect, useState } from 'react'
import { Project_ID } from '../Constants';

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

    useEffect(() => {
        senddata()
    }, [])
    return (
        <div style={{ width: '70vw' }}>
            <button onClick={()=>settoggle(true)}>Flight</button> &nbsp;&nbsp;
            <button onClick={()=>settoggle(false)}>Hotels</button>

            {tripdata && toggle && tripdata.map((item, index) => item.booking_type === 'flight' &&(
                <div key={index}>
                    <p>{item.flight.source}</p>
                    <p>{item.flight.destination}</p>
                    <p>{item.flight.departureTime}</p>
                    <p>{item.flight.arrivalTime}</p>
                    <p>-----------------------------</p>
                </div>
            ))}

            {tripdata && !toggle && tripdata.map((item, index) => item.booking_type === 'hotel' &&(
                <div key={index}>
                    <p>{item.hotel.location}</p>
                    <p>{item.hotel.name}</p>
                    <p>{item.start_date}</p>
                    <p>-----------------------------</p>
                </div>
            ))}
        </div>
    )
}
