import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImgCorousel from "../Corousel/FlightPage/ImgCorousel.js";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { Base_URL, Project_ID, App_Type, handleselectionCategory } from "../Constants.js";
import './Hotel.css'
import { BiUser } from "react-icons/bi";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { useAuthContext } from "../ContextAllData.js";
import { location } from "../../Resources/Icons.js";

export default function Hotel() {
  const [offers, setOffers] = useState([]);
  const [counter, setCounter] = useState(0);
  const [imgCounter, setImgCounter] = useState(0);
  const [selectVisible, setSelectVisible] = useState(false);
  const [whereFrom, setWhereFrom] = useState(false);
  const [roomSelect, setRoomSelect] = useState(false);
  const [inputSelect, setInputSelect] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputResult, setInputResult] = useState([]);
  const [fromDate, setFromDate] = useState(`${new Date().toISOString().split("T")[0]}`)
  const [toDate, setToDate] = useState(`${new Date().toISOString().split("T")[0]}`)
  const [selection, setSelection] = useState('1Room, 1 Adult')

  const { childrencount, adultcount, handleIncrease, handleDecrease } = handleselectionCategory()
  const navigate = useNavigate()
  const { all, setall } = useAuthContext()

  const arr = [
    { category: "Adult", age: "(12+ Years)", count: 1 },
    { category: "Children", age: "(2 - 12 yrs)", count: 0 },
  ];

  const object = [
    { url: " https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/GiftCards_RR_12072023.png", class: "Economy", fareType: "Regular fare", },
    { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_DOTW_Varanasi_F_0501.jpg", class: "Business class", fareType: "Student fare", },
    { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_CTTHAI_F_2012.jpg", class: "First class", fareType: "Senior citizen fare", },
    { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_Medicancel_F_1711.jpg", class: "Premium class", fareType: "Armed forces fare", },
  ];

  //   -----------functions-----------------
  const handleSelectCategory = () => {
    setSelectVisible(!selectVisible);
    setWhereFrom(false);
  };

  // ----------------------------------Carausal buttons------------------------------------
  const handleCarouselButtonClick = (type, direction) => {
    if (type === "offer-corousel") {
      if (direction === "next") {
        setCounter((prevCounter) => (prevCounter + 1) % offers.length);
      } else if (direction === "prev") {
        setCounter(
          (prevCounter) => (prevCounter - 1 + offers.length) % offers.length
        );
      }
    } else if (type === "img-corousel") {
      if (direction === "next") {
        setImgCounter((prevCounter) => (prevCounter + 1) % offers.length);
      } else if (direction === "prev") {
        setImgCounter(
          (prevCounter) => (prevCounter - 1 + offers.length) % offers.length
        );
      }
    }
  };
  // ----------------------------------Carausal buttons------------------------------------

  const handleRoomSelect = () => {
    setRoomSelect(!roomSelect)
  }

  const handleInputSelect = () => {
    setInputSelect(!inputSelect)
  }

  const handleToInput = (selectedHotel) => {
    setInputValue(selectedHotel);
    setInputSelect(false)
  }

  const handleSelection = (selection) => {
    setSelection(selection)
  }

  //   -----------functions-----------------

  const fetchHotels = useCallback(async (inputVal) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${inputVal}"}`, {
        method: "GET",
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJlZWE2ZWM3MjNmN2NkZTA0OTJmNSIsImlhdCI6MTcwNTkxNDQyMywiZXhwIjoxNzM3NDUwNDIzfQ.NsXu4O1WNOfj__A2bSWNhgoazcYlUFMaWeMDp_fPTow',
          projectID: Project_ID,
          "Content-Type": "application/json",
        }
      })
      const result = await response.json()
      const arr = result.data.hotels.map(item => { return item.location })
      setInputResult(new Set(arr))
    } catch (error) {
      console.log(error);
    }
  }, [inputValue])

  useEffect(() => {
    fetchHotels("")
  }, [])

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`${Base_URL}/offers?filter={"type":"CABS"}`, {
          method: "GET",
          headers: {
            projectID: Project_ID,
            "Content-Type": "application/json",
          }
        })
        const result = await res.json()
        setOffers(result.data.offers)
      } catch (error) {
        return error
      }
    }
    fetchOffer()
  }, []);

  const handleSearchFlight = () => {
    setall(prev => ({ ...prev, inputValue: inputValue }));
    (inputValue !== '' && fromDate !== '' && toDate !== '') && navigate(`/hotels/results?location=${inputValue}&dateFrom=${fromDate}&dateTo=${toDate}`)
  }


  return (
    <div className="hotel-home">
      <div>
        <div className="home-main">
          <h1>Search Hotels</h1>
          <h2>Enjoy hassle free bookings with Cleartrip</h2>
          <form className="search-card-hotel">
            <div className="hotelSearch-sec">
              <div className="search-card-hotel-input-div">
                <input
                  id="inputHotel"
                  type="text"
                  placeholder="Enter locality, landmark, city or hotel"
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); fetchHotels(e.target.value) }}
                  onClick={() => handleInputSelect()}
                />
                <div className="location-icon">{location}</div>
              </div>
              {inputSelect &&
                <div className="hotelInputExpand">
                  <p>Popular destinations</p>
                  {Array.from(inputResult).map((item, index) => (
                    <div key={index} className="hotelInputExpand-content flexY">
                      <h2>{location}</h2>
                      <h1 onClick={() => handleToInput(item)}>{item}</h1>
                    </div>
                  ))}
                </div>
              }
              <div className="input-hotel-date flexXY">
                <div className="flexXY">
                  <input id="hotelDate1" value={fromDate} onChange={(e) => setFromDate(e.target.value)} type="date" min={new Date().toISOString().split('T')[0]} />
                  <input id="hotelDate2" value={toDate} onChange={(e) => setToDate(e.target.value)} type="date" min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="hotelSelectCateg flex" onClick={() => handleRoomSelect()}>
                  <BiUser />
                  <h4>
                    {selection || adultcount || `1 Room, ${adultcount} Adults `} &nbsp;
                    {childrencount > 0 && (<>{childrencount} <span>Childrens</span></>)}
                  </h4>
                  <h4></h4>
                  {roomSelect && <div className="hotelSelect-expand1 flexX">
                    <h5>Quick select</h5>
                    <li onClick={() => handleSelection(`1 Room, 1 Adult`)}>1 Room, 1 Adult</li>
                    <li onClick={() => handleSelection('1 Room, 2 Adult')}>1 Room, 2 Adult</li>
                    <li onClick={() => handleSelection('2 Room, 4 Adult')}>2 Room, 4 Adult</li>
                    <p onClick={() => handleSelectCategory()}>Add more rooms and travellers</p>
                  </div>
                  }
                  {selectVisible && (
                    <div className="hotelSelectCateg-Expand">
                      <div className="hotelSelectCateg-Expand-header flexBet">
                        <h5>Quick select</h5>
                        <p onClick={() => setSelectVisible(!selectVisible)}>Show options</p>
                      </div>
                      {arr.map((items, index) => (
                        <div key={index} className="hotelSelectCateg-Expand-container flexBet">
                          <div>
                            <h1>{items.category}</h1>
                            <h5>{items.age}</h5>
                          </div>
                          <div className="hotelSelectCateg-count flexY">
                            <CgMathMinus
                              className={`${(items.category === "Adult" && adultcount > 1) ||
                                (items.category === "Children" && childrencount > 0)
                                ? "hotelChangeToPosIcon"
                                : "hotelCountNegIcon"
                                }`}
                              onClick={() => handleDecrease(items.category)}
                            />
                            <h1>
                              {items.category === "Adult"
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
                      <div className="hotelAddAnother flexY" onClick={() => handleSelectCategory()}>
                        <CgMathPlus />
                        <span>Add another room</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="hotelSearchDiv">
                <button id="hotelSearchBtn" onClick={() => handleSearchFlight()}>
                  Search Hotels
                </button>
              </div>
            </div>
          </form>
        </div>
        <img alt="cancel for no reason banner" loading="lazy" width="610" height="80" decoding="async" data-nimg="1" src="https://www.cleartrip.com/offermgmt/hotelsCommonImages/cfnr/cfnr-home-banner.jpg" style={{ color: "transparent" }} />
      </div>
      <div className="offer-sec ">
        <ImgCorousel />
        <div className="flexBet">
          <h1 id="more">More offers</h1>
          <h1 style={{ color: 'blue' }} onClick={() => navigate('/')} id="more">View all</h1>
        </div>

        {/* ----------------------------------Offer-------------------------------- */}
        {offers.length && (
          <div id="offer-corousel" key={offers._id}>
            <div className="corousel-content">
              <h2>{offers[counter].pTx} offers</h2>
              <h2>{offers[counter].pTl} offers</h2>
              <a>Know more</a>
            </div>
            <div id="corousel-btn" className="flexXY">
              <div>
                <FaLessThan
                  onClick={() =>
                    handleCarouselButtonClick("offer-corousel", "prev")
                  }
                  id="prevIcon"
                />
              </div>
              <div className="btn-dots">
                {offers.map((offer, index) => (
                  <div key={offer._id}>
                    <div
                      onClick={() => setCounter(index)}
                      className={`dot ${offer._id === imgCounter ? "active-class" : ""
                        }`}
                    ></div>
                  </div>
                ))}
              </div>
              <div>
                <FaGreaterThan
                  onClick={() =>
                    handleCarouselButtonClick("offer-corousel", "next")
                  }
                  id="nextIcon"
                />
              </div>
            </div>
          </div>
        )}
        {/* ----------------------------------Offer-------------------------------- */}

      </div>
    </div>
  );
}
