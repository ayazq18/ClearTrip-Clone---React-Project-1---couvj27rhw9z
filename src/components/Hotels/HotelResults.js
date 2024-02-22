import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Base_URL, Project_ID } from "../Constants";

import HotelNavBar from './HotelNavBar';
const CardCarausal = lazy(() => import('../Corousel/HotelPage/CardCarausal'));
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer';
const HotelResults = () => {
    const hotelLocation = useLocation();
    const searchParams = new URLSearchParams(hotelLocation.search);
    let inputResult = searchParams.get("location");
    let fromDate = searchParams.get("dateFrom");
    let toDate = searchParams.get("dateTo");


    const [hotelsResultData, setHotelResultData] = useState()
    const [pagination, setPagination] = useState(1)
    const [resultforpagination, setresultforpagination] = useState()
    const [rating, setrating] = useState("1");
    const [minrange, setminrange] = useState(1000);
    const [maxrange, setmaxrange] = useState(10000);
    const [lowhigh, setlowhigh] = useState("");
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()

    function sortingincreaseordecrease(value) {
        if (lowhigh == "") {
            return value;
        }
        else if (lowhigh == "hightolow") {
            return value.sort((a, b) => b.avgCostPerNight - a.avgCostPerNight);
        }
        else if (lowhigh == "lowtohigh") {
            return value.sort((a, b) => a.avgCostPerNight - b.avgCostPerNight);
        }
    }

    const fetchHotels = useMemo(async () => {
        try {
            setLoad(false)
            const response = await fetch(`${Base_URL}/hotel?search={"location":"${inputResult}"}&filter={"rating":{"$gte":"${rating}"}}&page=${pagination}&limit=10`, { method: "GET", headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJlZWE2ZWM3MjNmN2NkZTA0OTJmNSIsImlhdCI6MTcwNTkxNDQyMywiZXhwIjoxNzM3NDUwNDIzfQ.NsXu4O1WNOfj__A2bSWNhgoazcYlUFMaWeMDp_fPTow', projectID: Project_ID, "Content-Type": "application/json" } });
            const result = await response.json()
            setresultforpagination(result.totalResults)
            setHotelResultData(sortingincreaseordecrease(result.data.hotels))
            setLoad(true)
        } catch (error) {
            console.log(error);
        }
    }, [inputResult, pagination, rating, lowhigh])

    useEffect(() => {
        fetchHotels
    }, [inputResult, lowhigh])

    const handleHotelCardInfo = (hotelId) => {
        if(localStorage.getItem('token')){
        navigate(`/hotels/results/hotelcardsinfo?hotelId=${hotelId}&location=${inputResult}&dateFrom=${fromDate}&dateTo=${toDate}`)
        }else{
            alert("You need to signin first!")
        }
    }

    return (
        <>
        {load && hotelsResultData && 
        <div>
        <div className='hotelHome'>
            <div><HotelNavBar lowhigh={lowhigh} setlowhigh={setlowhigh} minrange={minrange} setminrange={setminrange} maxrange={maxrange} setmaxrange={setmaxrange} rating={rating} setrating={setrating} inputResult={inputResult} fromDate={fromDate} toDate={toDate} /></div>
            <div className='hotelMain flexXY'>
                <div className='hotelMain-container'>
                    <div className='hotelMain-container-card'>
                        {hotelsResultData && hotelsResultData.map((item, index) => (item.avgCostPerNight < maxrange && item.avgCostPerNight > minrange && (
                            <div key={index} className='hotelMain' onClick={() => handleHotelCardInfo(item._id)}>
                                <Suspense fallback={<div>Loading Carausal</div>}>
                                    <div><CardCarausal data={item.images} /></div>
                                </Suspense>
                                <div className='hotelMain-sec1 flexBet' >
                                    <h5>{item.name}</h5>
                                    <div className='hotelMain-sec1-div1 flexBet'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" fill="none" viewBox="0 0 18 12" className=""><path fill="#1a1a1a" d="M16.603 3.717L18 2.202h-3.097a9.696 9.696 0 00-10.886 0H.912l1.397 1.515A4.257 4.257 0 00.914 6.676a4.243 4.243 0 001.121 3.072 4.269 4.269 0 002.977 1.373 4.283 4.283 0 003.075-1.137l1.369 1.485 1.368-1.483a4.26 4.26 0 002.9 1.133 4.264 4.264 0 004.271-4.256 4.234 4.234 0 00-1.392-3.146zM5.186 9.742a2.896 2.896 0 01-2.67-1.778 2.871 2.871 0 01.627-3.138 2.892 2.892 0 013.148-.624 2.887 2.887 0 011.784 2.66A2.872 2.872 0 017.229 8.9a2.89 2.89 0 01-2.043.843zm4.27-2.963c0-1.895-1.384-3.521-3.207-4.217a8.361 8.361 0 016.413 0c-1.823.696-3.206 2.322-3.206 4.217zm4.268 2.963a2.896 2.896 0 01-2.669-1.778 2.872 2.872 0 01.626-3.138 2.892 2.892 0 013.15-.624 2.887 2.887 0 011.783 2.66c0 .764-.305 1.497-.847 2.037a2.894 2.894 0 01-2.043.843zm0-4.39a1.518 1.518 0 00-1.399.933 1.504 1.504 0 00.328 1.645 1.516 1.516 0 002.586-1.068c0-.4-.16-.784-.444-1.067a1.517 1.517 0 00-1.07-.442zM6.7 6.863a1.506 1.506 0 01-.935 1.395 1.52 1.52 0 01-1.65-.327 1.508 1.508 0 011.07-2.577 1.518 1.518 0 011.401.931c.076.184.115.38.115.578z"></path></svg>
                                        <p>{item.rating}/5</p>
                                    </div>
                                </div>
                                <div className='hotelMain-sec2 flexBet'>
                                    <h6>{item.amenities.length}-star hotel . {item.location}</h6>
                                </div>
                                <div className='hotelMain-sec3'>
                                    <div className='hotelMain-sec3-container1 flexY'>
                                        <p className='contain1'>{Math.floor(item.avgCostPerNight).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1,')}</p>
                                        <p className='contain2'>+ {((item.rooms[0].costDetails.taxesAndFees)).toString().match(/^(\d+)(?=\.)/) ? ((item.rooms[0].costDetails.taxesAndFees)).toString().match(/^(\d+)(?=\.)/)[0] : (item.rooms[0].costDetails.taxesAndFees)}</p>
                                        <p className='contain3'>tax / night</p>
                                    </div>
                                    <div className='hotelMain-sec3-container2 flexY'>
                                        <del className='contain1'>{Math.floor(item.rooms[0].costDetails.baseCost)}</del>
                                        <p className='contain3'>+ Additional bank discounts</p>
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            </div>
          <div className='paginationBtn flexXY g20'>
                <button className={` ${(pagination === 1) ? 'inactive' : 'btn'}`} onClick={() => setPagination(pagination - 1)} disabled={pagination == 1}>Prev</button>
                <h4>...{pagination}</h4>
                <button className={` ${(pagination === +resultforpagination / 10) ? 'inactive' : 'btn'}`} onClick={() => setPagination(pagination + 1)} disabled={+resultforpagination / 10 == pagination} >Next</button>
            </div>
        </div>
        <Footer/>
        </div>}
        {!load && <div className='loader'></div>}
        </>
    );
}

export default HotelResults;
