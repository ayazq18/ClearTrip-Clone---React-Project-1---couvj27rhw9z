import React, { useEffect, useState } from "react";
import './LoginCorousel.css'
const LoginCorousel = () => {
  const images = [
    { url: "https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo=" },
    { url: "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" },
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
