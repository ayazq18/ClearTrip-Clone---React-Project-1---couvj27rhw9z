import { useState,useEffect } from "react";
import "./CardCarausal.css"

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
function HotelsResultCardsCarousal({data}) {
    const [slide, setSlide] = useState(0);
    
    function nextSlide() {
        setSlide((slide + 1)%data.length);
    }
    function prevSlide() {
        if(slide==0){
            setSlide(data.length-1);
        }
        else{
        setSlide((slide - 1)%data.length);
        }
    }
    return (
        <div className="carousel HotelsResultCardsCarousalMainDiv flexXY">
            {
                data.map((item, idx) => {
                    return <img src={item} alt="img" key={idx} className={slide == idx ? "slide" : "slide slide-hidden"} />
                })
            }
            <div className="flexXY">
                <svg onClick={prevSlide} className="arrow leftarrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><mask id="mask0_1027_112362" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse" ><path fill="#D9D9D9" d="M0 0H20V20H0z"></path></mask><g mask="url(#mask0_1027_112362)"><path fill="#1A1A1A" d="M11.264 14.393l-3.857-3.857a.705.705 0 01-.161-.247.801.801 0 010-.578.707.707 0 01.161-.246l3.857-3.858a.617.617 0 01.45-.192c.172 0 .322.064.45.192a.617.617 0 01.193.45.617.617 0 01-.193.45L8.671 10l3.493 3.493a.617.617 0 01.193.45.616.616 0 01-.193.45.616.616 0 01-.45.193.617.617 0 01-.45-.193z"></path></g></svg>
                <span className="indicators">
                    {
                        data.map((_, idx) => {
                            return <button key={idx} onClick={() => setSlide(idx)} className={slide == idx ? "indicator indicator-active" : "indicator indicator-inactive"}></button>
                        })
                    }
                </span>
                <svg  className="arrow rightarrow" onClick={nextSlide} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><mask id="mask0_1027_112365" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse" ><path fill="#D9D9D9" d="M20 20H40V40H20z" transform="rotate(-180 20 20)"></path></mask><g mask="url(#mask0_1027_112365)"><path fill="#1A1A1A" d="M8.736 5.607l3.857 3.857a.706.706 0 01.161.247.8.8 0 010 .578.707.707 0 01-.161.246l-3.857 3.858a.617.617 0 01-.45.192.617.617 0 01-.45-.192.617.617 0 01-.193-.45c0-.172.064-.322.193-.45L11.329 10 7.836 6.507a.617.617 0 01-.193-.45c0-.172.064-.322.193-.45a.617.617 0 01.45-.193c.171 0 .321.064.45.193z"></path></g></svg>
            </div>
        </div>
    )
}

export default HotelsResultCardsCarousal;