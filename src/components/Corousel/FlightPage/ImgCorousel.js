import React, { useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan, } from "react-icons/fa";
import './ImgCorousel.css'
const Carousel = () => {
  const images = [
    { url: "https://www.shutterstock.com/image-vector/travel-promo-vector-design-tour-260nw-2172252889.jpg" },
    { url: "https://c8.alamy.com/comp/2WK7XK7/online-tickets-services-landing-page-low-cost-flights-budget-air-tickets-cheap-flights-concept-web-banner-template-couple-of-tourists-with-baggag-2WK7XK7.jpg" },
    { url: "https://www.shutterstock.com/image-vector/travel-promo-vector-design-tour-260nw-2172252889.jpg" },
    { url: "https://c8.alamy.com/comp/2WK7XK7/online-tickets-services-landing-page-low-cost-flights-budget-air-tickets-cheap-flights-concept-web-banner-template-couple-of-tourists-with-baggag-2WK7XK7.jpg" },
  ];

  const [imgCounter, setImgCounter] = useState(0);

  useEffect(()=>{
    const Imgcorousel =  setInterval(() => {
         setImgCounter((prevImage)=>(prevImage+1) % images.length)
     }, 2000);

     return ()=>{
         clearInterval(Imgcorousel)
     }
 }, [images.length])

  const handleCarouselButtonClick = (action) => {
    if (action === "prev") {
      setImgCounter((prevCounter) => (prevCounter - 1 + images.length) % images.length);
    } else if (action === "next") {
      setImgCounter((prevCounter) => (prevCounter + 1) % images.length);
    }
  };

  return (
    <div className="carousel-container-one">
         <div className="img-corousel-one">
            <img src={images[imgCounter].url} alt={`carousel-img-${imgCounter}`} />
         </div>
      <div id="Imgcorousel-btn" className="flexXY one">
        <div>
          <FaLessThan
            onClick={() => handleCarouselButtonClick("prev")}
            id="prevIcon-one"
          />
        </div>
        <div className="Imgbtn-dots-one flexXY">
          {images.map((offer, index) => (
            <div key={index} onClick={() => setImgCounter(index)} className={`dots-one ${ index === imgCounter ? "active-class-one" : ""}`}
            style={{color:"#fff"}}>
            </div>
          ))}
        </div>
        <div>
          <FaGreaterThan
            onClick={() => handleCarouselButtonClick("next")}
            id="nextIcon-one"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
