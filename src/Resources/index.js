import { Base_URL, Project_ID, appType } from "../components/Constants";
import React, { createContext, useContext, useState } from 'react';

import React, { useEffect, useMemo, useState } from 'react'
import { Project_ID } from '../Constants';

{/* <li>
<NavLink to={token && "/mytrips"} onClick={()=>!token && setShowSignUp(!showSignup)}>
<div className="flexY g10">
    <div>{mytrips}</div>
    <h2 className="aside-links">My trips</h2>
    </div>
</NavLink>
</li> */}
// export default function MyTrips() {
//     const [ data, setdata] = useState([]);
//     const [toggle, settoggle] = useState(false)

//     const fetchmytrips = useMemo (async ()=>{
//         try{
//             const response = await (await fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking/', {
//                 method:'Get',
//                 headers:{
//                     projectId: Project_ID,
//                     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//                     'Content-type': 'application/json',
//                 },
//             })).json()
//             console.log(response)
//             setdata(response.data)
//         }catch(error){
//             console.log(error)
//         }
//     }, [])

//     useEffect(()=>{
//         fetchmytrips
//     })
//   return (
//     <div style={{width:'70vw'}}>
//         <button onClick={()=>settoggle(!toggle)}>{toggle ? 'Flights' : 'Hotels'}</button>
//       {/* <h2>My Trips</h2> */}
//       {/* <p>--------------------------------------------</p> */}
//       {data && toggle && data.map((item, index)=> item.booking_type==="flight" && (
//       <div key={index}>
//         <p>{item.flight.source}</p>
//         <p>{item.flight.destination}</p>
//         <p>{item.flight.departureTime}</p>
//         <p>{item.flight.arrivalTime}</p>
//         <p>------------------------------</p>
//       </div>
//       ))}

//       {/* <h2>My Booking</h2> */}
//       {/* <p>--------------------------------------------</p> */}
//       {data && !toggle && data.map((item, index)=> item.booking_type==="hotel" && (
//       <div key={index}>
//         <p>{item.hotel.name}</p>
//         <p>{item.hotel.location}</p>
//         <p>{item.start_date}</p>
//         <p>{item.end_date}</p>
//         <p>------------------------------</p>
//       </div>
//       ))}
//     </div>
//   )
// }

    