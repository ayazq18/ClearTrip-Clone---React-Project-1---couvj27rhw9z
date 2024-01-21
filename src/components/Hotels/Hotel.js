import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImgCorousel from "../Corousel/FlightPage/ImgCorousel.js";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { fetchOffer } from "../Services/index.js";
import Form from "../Form/Form.js";
import './Hotel.css'
import { BiUser } from "react-icons/bi";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { useAuthContext } from "../ContextAllData.js";
import { location } from "../Services/Icons.js";

export default function Hotel() {
  const [offers, setOffers] = useState([]);
  const [counter, setCounter] = useState(0);
  const [imgCounter, setImgCounter] = useState(0);
  const [adultcount, setAdultCount] = useState(1);
  const [childrencount, setChildrenCount] = useState(0);
  const [infantcount, setinfantCount] = useState(0);
  const [classs, setClasss] = useState("Economy");
  const [selectVisible, setSelectVisible] = useState(false);
  const [whereFrom, setWhereFrom] = useState(false);
  const [flightWhere, setFlightWhere] = useState([]);
  const [roomSelect, setRoomSelect] = useState(false);
  const [inputSelect, setInputSelect] = useState(false);


  const arr = [
    { category: "Adults", age: "(12+ Years)", count: 1 },
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
    // setWhereTo(false);
    // setWay(false);
    // setRotateCateg(
    //     selectVisible
    //         ? { transform: "rotate(0deg)", transition: 'transform 0.3s ease-in-out', }
    //         : { transform: "rotate(180deg)", transition: 'transform 0.3s ease-in-out', }
    // );
  };

  const {all} = useAuthContext()

    const handleIncrease = (category) => {
        switch (category) {
            case "Adults":
                setAdultCount(adultcount + 1);
                break;
            case "Children":
                setChildrenCount(childrencount + 1);
                break;
            case "Infants":
                setinfantCount(infantcount + 1);
                break;
            default:
                break;
        }
    };

    const handleDecrease = (category) => {
        switch (category) {
            case "Adults":
                adultcount > 1 && setAdultCount(adultcount - 1);
                break;
            case "Children":
                childrencount > 0 && setChildrenCount(childrencount - 1);
                break;
            case "Infants":
                infantcount > 0 && setinfantCount(infantcount - 1);
                break;
            default:
                break;
        }
    };

    const handleRoomSelect = ()=>{
      setRoomSelect(!roomSelect)
    }

    const handleInputSelect = ()=>{
      setInputSelect(!inputSelect)
    }
  //   -----------functions-----------------

  useEffect(() => {
    // Offers
    fetchOffer()
      .then((result) => {
        setOffers(result.data.offers);
        // console.log(result)
      })
      .catch((error) => {
        console.log("Error fetching offers:", error);
      });
    
  }, [offers.length]);
  return (
    <div className="hotel-home">
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
                onClick={()=>handleInputSelect()}
            />
            <div className="location-icon">{location}</div>
          </div>
        {inputSelect &&
          <div className="hotelInputExpand">
            <p>Popular destinations</p>
          </div>
        }
        <div className="input-hotel-date flexXY">
            <div className="flexXY">
                <input id="hotelDate1" type="date" min={new Date().toISOString().split('T')[0]}/>
                <input id="hotelDate2" type="date" min={new Date().toISOString().split('T')[0]}/>
            </div>
            <div className="hotelSelectCateg flex" onClick={()=>handleRoomSelect()}>
                    <BiUser/>
                    <h4>
                        {adultcount && (<> {adultcount} <span>Room, </span> </>)}
                        {childrencount > 0 && (<>{childrencount} <span>Childrens, </span></>)}
                    </h4>
                    <h4>2 Adults</h4>
               {roomSelect && <div className="hotelSelect-expand1 flexX">
                    <h5>Quick select</h5>
                    <li>1 Room, 1 Adult</li>
                    <li>1 Room, 2 Adult</li>
                    <li>2 Room, 4 Adult</li>
                    <p onClick={() => handleSelectCategory()}>Add more rooms and travellers</p>
                </div>}
            {selectVisible && (
                <div className="hotelSelectCateg-Expand">
                    <div className="hotelSelectCateg-Expand-header flexBet">
                        <h5>Quick select</h5>
                        <p onClick={()=>setSelectVisible(!selectVisible)}>Show options</p>
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
                    <div className="hotelAddAnother flexY" onClick={() => handleSelectCategory()}>
                    <CgMathPlus/>
                    <span>Add another room</span>
                    </div>
                </div>
            )}
            </div>
        </div>
            <div className="hotelSearchDiv">
                <button id="hotelSearchBtn">
                    Search flights
                </button>
            </div>
            </div>
        </form>
       {/* <Form onClick={(e)=>handleSearchFlight(e)}/> */}
      </div>
       {/* offer section */}
       <div className="offer-sec ">
        <ImgCorousel />
        <h1 id="more">More offers</h1>
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
                      className={`dot ${
                        offer._id === imgCounter ? "active-class" : ""
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
        </div>
    </div>
  );
}
