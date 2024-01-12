import React, { useEffect, useState } from "react";
import './LoginCorousel.css'
const LoginCorousel = () => {
  const images = [
    { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_410,h_337,dpr_2/offermgmt/images/slider3.png" },
    { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_410,h_337,dpr_2/offermgmt/images/slider2.png" },
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

  return (
    <div className="carousel-container-two">
         <div className="img-corousel-two">
            <img src={images[imgCounter].url} alt={`carousel-img-${imgCounter}`} />
         </div>
      <div id="Imgcorousel-btn-two" className="flexXY">
        <div className="Imgbtn-dots-two flexXY">
          {images.map((offer, index) => (
            <div key={index} onClick={() => setImgCounter(index)} className={`dots-two ${ index === imgCounter ? "active-class-two" : ""}`}
            style={{color:"#fff"}}>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginCorousel;
