import React, { useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan, FaCircle } from "react-icons/fa";
import './ImgCorousel.css'
const Carousel = () => {
  const images = [
    { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/GiftCards_RR_12072023.png" },
    { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_DOTW_Varanasi_F_0501.jpg" },
    { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_CTTHAI_F_2012.jpg" },
    { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_Medicancel_F_1711.jpg" },
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
