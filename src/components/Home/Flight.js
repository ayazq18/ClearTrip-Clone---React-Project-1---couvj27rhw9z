import React, { useEffect, useState } from "react";
import ImgCorousel from "../Corousel/FlightPage/ImgCorousel.js";
import "./Flight.css";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { Base_URL, Project_ID } from "../Constants.js";
import Form from "../Form/Form.js";
import { flightbanner } from "../../Resources/Icons.js";

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [counter, setCounter] = useState(0);
  const [imgCounter, setImgCounter] = useState(0);

  //   -----------functions-----------------

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

  //   -----------functions-----------------
  const fetchOffer = async () => {
    try {
      const res = await fetch(`${Base_URL}/offers?filter={"type":"FLIGHTS"}`, {
        method: "GET",
        headers: {
          projectID: Project_ID,
          "Content-Type": "application/json",
        }
      })
      const result = await res.json()
      setOffers(result.data.offers);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchOffer();
  }, []);


  return (
    <div className="home">
      <div className="home-main">
        <h1>Search flights</h1>
        <h2>Enjoy hassle free bookings with Cleartrip</h2>
        <Form onClick={(e) => handleSearchFlight(e)} />
       <div class="maxbox "><div>{flightbanner}<span class="flex flex-between statement">Free cancellation or free date change starting from ₹499. T&amp;C apply.</span></div></div>
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
      </div>
    </div>
  );
}
