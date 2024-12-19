import { useState } from "react";

export const Project_ID = "Ccouvj27rhw9z";
export const Base_URL = 'https://academics.newtonschool.co/api/v1/bookingportals';
export const App_Type= 'bookingportals';
import { trips, shortlists, travellers, wallet, hiFive, Expressway, profile, settings, cancel, change, print, voucher } from "../Resources/Icons";

export const expandedObj = [
  {item : 'Trips', icons : trips, toolsIcon: cancel,  tools : 'Cancellations'},
  {item : 'ShortList', icons : shortlists, toolsIcon: change,  tools : 'Change flights'},
  {item : 'Travellers', icons : travellers, toolsIcon: print,  tools : 'Print tickes'},
  {item : 'Cleartrip Wallet', icons : wallet, toolsIcon: voucher,  tools : 'Print hotel voucher'},
  {item : 'Hi-Five', icons : hiFive},
  {item : 'Expressway', icons : Expressway},
  {item : 'Profile', icons : profile},
  {item : 'Settings', icons : settings},
]

export const getAirlineInfo = (flightIDs) => {
    let logoSrc, airlineName;
    switch (flightIDs.slice(0, 2)) {
      case '6E': logoSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFF6Szgfwsb2tOSaSEdnQqUIaIO3SqCbjhQ&s'; airlineName = 'Indigo'; break;
      case 'AI': logoSrc = 'https://uxdt.nic.in/wp-content/uploads/2020/06/Preview-2.png?x23734'; airlineName = 'Air India'; break;
      case 'QP': logoSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ3Gq_woK4rbx6iyGpcNLtyaO4ks5dmUjDpw&s'; airlineName = 'Akasa Air'; break;
      case 'UK': logoSrc = 'https://thehardcopy.co/wp-content/uploads/Vistara-Images-7-1200x805.png'; airlineName = 'Vistara'; break;
      case 'SG': logoSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAxMTS8LLM2N8sGJ3_S3ww4adYj-7quEA3SA&s'; airlineName = 'Spicejet'; break;
      case 'IX': logoSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM70hjiFpo1RsYbkeTAJqH9n4DFH6u9bjadQ&s'; airlineName = 'Air India Express'; break;
      case 'G8': logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/8/86/GoAir_Logo.png'; airlineName = 'GoAir'; break;
      case 'I5': logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/1200px-AirAsia_New_Logo.svg.png'; airlineName = 'AirAsia India'; break;
      default: logoSrc = ''; airlineName = '';
    }
    return { logoSrc, airlineName };
};

export const arr = [
  { category: "Adult", age: "(12+ Years)", count: 1 },
  { category: "Children", age: "(2 - 12 yrs)", count: 0 },
  { category: "Infant", age: "(Below 2 yrs)", count: 0 },
];

export const object = [
  { url: " https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/GiftCards_RR_12072023.png", class: "Economy", fareType: "Regular fare", },
  { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_DOTW_Varanasi_F_0501.jpg", class: "Business class", fareType: "Student fare", },
  { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_CTTHAI_F_2012.jpg", class: "First class", fareType: "Senior citizen fare", },
  { url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_Medicancel_F_1711.jpg", class: "Premium class", fareType: "Armed forces fare", },
];

export function handleselectionCategory() {
  const [adultcount, setAdultCount] = useState(1);
  const [childrencount, setChildrenCount] = useState(0);
  const [infantcount, setinfantCount] = useState(0);
  function handleIncrease(category){
  switch (category) {
      case "Adult":setAdultCount(adultcount + 1);break;
      case "Children":setChildrenCount(childrencount + 1);break;
      case "Infant":setinfantCount(infantcount + 1);break;
      default: break;
  }
}
const handleDecrease = (category) => {
  switch (category) {
      case "Adult":
          adultcount > 1 && setAdultCount(adultcount - 1);
          break;
      case "Children":
          childrencount > 0 && setChildrenCount(childrencount - 1);
          break;
      case "Infant":
          infantcount > 0 && setinfantCount(infantcount - 1);
          break;
      default:
          break;
  }
}
  return {handleIncrease, handleDecrease, adultcount, setAdultCount, childrencount, setChildrenCount, infantcount, setinfantCount }
};