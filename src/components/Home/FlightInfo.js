import React, { useState, useEffect, useRef, useMemo } from 'react'
import "./FlightInfo.css";
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";
import { useAuthContext } from '../ContextAllData';
import { Project_ID, getAirlineInfo } from '../Constants';

export default function FlightInfo() {
  const {all, setall} = useAuthContext()
  const navigate = useNavigate();
  const inputref = useRef()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let flightid = searchParams.get("flightid");
  let ID = searchParams.get("ID");
  let date = searchParams.get("date")
  let source = searchParams.get("source")
  let destination = searchParams.get("destination")
  
  const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor (Timor-Leste)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican state", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]
  const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "New South Wales", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia", "Australian Capital Territory", "Northern Territory", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"];

  const [pageLoader, setpageLoader] = useState(false);
  const [dataa, setdataa] = useState();
  const [phonenumber, setphonenumber] = useState("");
  const [email, setemail] = useState("");
  const [details, setdetails] = useState({ dnumber: "", demail: "", dfname: "", dlname: "", dgender: "", dcountry: "", dstate: "", dbillingAddress: "" })
  const [errorcontact, seterrorcontact] = useState(false);
  const [pop, setpop] = useState({});
  const [switcherform, setswitcherform] = useState(false);

  function popp(key) {
    setpop({});
    setpop((prev) => ({ ...prev, [key]: !pop[key] }));
  }

  function startdate(){
    const departureDate = new Date(date);
    const [hours, minutes] = dataa.departureTime.split(":");
    departureDate.setHours(hours, minutes);
    
    return departureDate;
  }

  function enddate(){
    const [departureHours, departureMinutes] = dataa.departureTime.split(":");
    const [arrivalHours, arrivalMinutes] = dataa.arrivalTime.split(":");
    const arrivalDate = new Date(date);
    if(departureHours>arrivalHours){
    arrivalDate.setHours(arrivalHours,arrivalMinutes);
    }
    else if(departureHours==arrivalHours){
      arrivalDate.setHours(arrivalHours,departureMinutes+arrivalMinutes)
    }
    else{
      arrivalDate.setHours(departureHours+arrivalHours,departureMinutes+arrivalMinutes)
    }
  
    return arrivalDate;
  }

  function personalInfosenderone(e) {
    e.preventDefault();
    if (phonenumber.length == 10 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setdetails((prev) => ({ ...prev, dnumber: phonenumber, demail: email }));
      setswitcherform(true);
      setphonenumber("");
      setemail("");
    }
    else {
      seterrorcontact(true);
    }
  }
  function travellerinfo(key, value) {
    setdetails((prev) => ({ ...prev, [key]: value }));
  }

  const senddata= async ()=>{
    try{
      if(details.dnumber && details.demail && details.dfname && details.dlname && details.dgender && details.dcountry && details.dstate && details.dbillingAddress){
        const response = await (await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/booking`,
                {
                    method: "POST",
                    Authorizaton: `Bearer ${localStorage.getItem('token')}`,
                    headers: {
                        projectID: Project_ID,
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({
                      bookingType : "flight",
                      bookingDetails : {
                            flighId : `${flightid}`,
                            startDate : `${startdate()}`,
                            endDate : `${enddate()}`
                      }
                  })
                }
            )).json();
      }
    }
    catch(error){
      alert(error);
    }
  }
  
  function gotopayment() {
    if (details.dnumber && details.demail && details.dfname && details.dlname && details.dgender && details.dcountry && details.dstate && details.dbillingAddress) {
      senddata();
      navigate(`/flights/results/Info/bookingpage?FirstName="${details.dfname}"&Email="${details.demail}"&Amount=${((dataa.ticketPrice * 18) / 100 + dataa.ticketPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
    }
  }

  function emailerror(e) {
    const inputval = e.target.value;
    const inputele = e.target;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputval)) {
      inputele.style.outline = "1px solid green";
    }
    else {
      inputele.style.outline = "none"
    }
  }

  function taxCalculate() {
    const val = (dataa.ticketPrice * 18) / 100;
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  function caltotalamout() {
    const val = (dataa.ticketPrice * 18) / 100;
    const add = val + dataa.ticketPrice;
    return add.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  function numbererror(e) {
    const inputValue = e.target.value;
    const inputElement = e.target;
    if (inputValue.length == 0) {
      inputElement.style.outline = "none";
    } else if (inputValue.length == 10) {
      inputElement.style.outline = "1px solid green";
    } else {
      inputElement.style.outline = "1px solid red";
    }

  }
  async function fetchdataforflightcarddetails() {
    try {
      const response = await (await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightid}`,
        {
          method: "GET",
          headers: {
            projectID: "mhroh2oic5sz",
            "Content-Type": "application/json",
          }
        }
      )).json();
      setdataa(response.data);
      setpageLoader(true);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    setpageLoader(false);
    fetchdataforflightcarddetails();
  }, []);

  return (
    <div className='flightInfo flexa flexc'>
      <div className="wholenav flexja">
        <nav className='flexa'>
          <NavLink to='/'>
            <svg width="107" height="24" viewBox="0 0 310 65" fill="none" color="#214497" className="mr-7"><path d="M249.469 16.3906C243.189 16.3906 240.039 19.1706 240.039 25.4606V49.1506H247.469V25.8206C247.469 23.7506 248.399 22.7506 250.539 22.7506H257.039V16.3906H249.469V16.3906Z" fill="#FF4F17"></path><path d="M264.891 1.59961C262.461 1.59961 260.461 3.59961 260.461 6.09961C260.461 8.59961 262.461 10.5296 264.891 10.5296C267.321 10.5296 269.391 8.52961 269.391 6.09961C269.391 3.66961 267.391 1.59961 264.891 1.59961Z" fill="#FF4F17"></path><path d="M268.61 16.2402H261.25V49.0902H268.61V16.2402Z" fill="#FF4F17"></path><path d="M121.289 42.8804C119.149 42.8804 118.219 42.3104 118.219 40.1704V1.65039H110.789V40.1704C110.789 46.6704 114.429 49.2404 120.139 49.2404H124.069V42.8804H121.289V42.8804Z" fill="#FF4F17"></path><path d="M209.119 16.2695C202.839 16.2695 199.689 19.0495 199.689 25.3395V49.1195H207.119V25.6995C207.119 23.6295 208.049 22.6295 210.189 22.6295H216.689V16.2695H209.119Z" fill="#FF4F17"></path><path d="M228.33 16.2998V8.08984H220.9V40.0798C220.9 46.2898 224.11 49.1498 230.33 49.1498H235.9V42.7898H231.4C229.4 42.7898 228.33 42.0798 228.33 40.0798V22.6598H235.9V16.2998H228.33V16.2998Z" fill="#FF4F17"></path><path d="M274.82 16.5006V63.3706H282.25V46.3006C284.91 48.1406 288.13 49.2306 291.6 49.2306C300.67 49.2306 308.02 41.8806 308.02 32.8106C308.02 23.7406 300.67 16.3906 291.6 16.3906C288.12 16.3906 284.9 17.4806 282.25 19.3206V16.5006H274.82V16.5006ZM282.25 32.8106C282.25 27.6406 286.44 23.4606 291.6 23.4606C296.76 23.4606 300.95 27.6506 300.95 32.8106C300.95 37.9706 296.76 42.1606 291.6 42.1606C286.44 42.1606 282.25 37.9706 282.25 32.8106V32.8106Z" fill="#FF4F17"></path><path d="M156.92 32.1006C156.92 22.1006 150.21 16.3906 141.42 16.3906C131.57 16.3906 125.5 23.2506 125.5 32.7406C125.5 42.2306 132.21 49.2406 141.57 49.2406C149.85 49.2406 154.21 45.5306 156.28 39.3906H148.28C147.07 41.7506 144.78 42.8206 141.42 42.8206C136.99 42.8206 133.35 40.0406 133.07 35.0406H156.78C156.92 33.4706 156.92 32.7506 156.92 32.1106V32.1006ZM133.14 29.7406C133.78 25.3806 136.85 22.7406 141.64 22.7406C146.43 22.7406 149.07 25.2406 149.49 29.7406H133.14Z" fill="#FF4F17"></path><path d="M98.8005 37.9506C97.5905 41.3806 95.3005 42.8106 91.8705 42.8106C86.2305 42.8106 83.8005 38.3806 83.8005 32.7406C83.8005 27.1006 86.5805 22.7406 92.0105 22.7406C95.4405 22.7406 97.7205 24.5306 98.7905 27.6006H106.72C104.86 20.1006 99.2905 16.3906 91.8705 16.3906C81.8705 16.3906 76.2305 23.5306 76.2305 32.7406C76.2305 42.7406 82.8705 49.2406 91.8705 49.2406C100.87 49.2406 105.22 44.1706 106.72 37.9606H98.7905L98.8005 37.9506Z" fill="#FF4F17"></path><path d="M56.6095 17.7393C44.1095 26.8793 33.3295 38.8793 23.6895 48.9493C22.9795 49.6593 22.0495 50.1593 21.0495 50.1593C19.8395 50.1593 18.9095 49.4493 18.0495 48.1593C15.5495 44.4493 11.7695 35.4493 10.0495 31.5193C8.68954 28.3093 9.40954 25.6593 12.6195 24.3093C15.8295 23.0193 19.3995 22.8093 20.2595 26.4493C20.2595 26.4493 21.8995 32.8093 22.3995 34.6593C32.3295 25.4493 44.5395 15.6693 54.8895 9.66929C52.3195 4.80929 47.2495 1.5293 41.4695 1.5293H16.9795C8.54954 1.5293 1.76953 8.30929 1.76953 16.6693V41.2293C1.76953 49.5793 8.54954 56.3693 16.9795 56.3693H41.4695C49.8195 56.3693 56.6095 49.5893 56.6095 41.2293V17.7393V17.7393Z" fill="#FF4F17"></path><path d="M186.059 16.5006V19.3206C183.399 17.4806 180.179 16.3906 176.709 16.3906C167.639 16.3906 160.289 23.7406 160.289 32.8106C160.289 41.8806 167.639 49.2306 176.709 49.2306C180.189 49.2306 183.409 48.1406 186.059 46.3006V49.0906H193.489V16.5006H186.059ZM176.709 42.1606C171.539 42.1606 167.359 37.9706 167.359 32.8106C167.359 27.6506 171.549 23.4606 176.709 23.4606C181.869 23.4606 186.059 27.6506 186.059 32.8106C186.059 37.9706 181.869 42.1606 176.709 42.1606Z" fill="#FF4F17"></path></svg>
          </NavLink>
        </nav>
      </div>
      {pageLoader && dataa &&
        <div className='flightInfoBody flexja'>
          <div className='flightInfovhbody flex'>
            <div className='leftdiv'>
              <div className='flightinfo-FirstPart flexa g20'>
                <div className='flightinfo-1-logo flexja'>1</div>
                <h1>Review your itinerary</h1>
              </div>
              <div className=' flightinfo-carddetails '>
                <div className='flightinfo-sou-To-des flexa g20'>
                  <div className='source-to-destination flexa'>
                    <p>{source}</p>&nbsp;
                    <p><svg viewBox="0 0 24 24" height="16" width="16"><g fill="none" fillRule="evenodd"><path fill="#FFF" d="M24 24H0V0h24z"></path><path fill="#FFF" d="M24 24H0V0h24z"></path><path fill="currentColor" d="M5 12.875h10.675l-4.9 4.9L12 19l7-7-7-7-1.225 1.225 4.9 4.9H5z"></path></g></svg></p>&nbsp;
                    <p>{destination}</p>
                  </div>
                  <div className='flightinfodate'>
                    {`${date}`}
                  </div>
                </div>
                <div className='flightinfo-cardPhases flex'>
                  <div className='flightinfo-cardPhase1st flexj flexc'>
                    <img src={getAirlineInfo(dataa.flightID.slice(0, 2)).logoSrc} alt="image" />
                    <div className='flightinfo-flightName'>{getAirlineInfo(dataa.flightID).airlineName}</div>
                    <div className='flightinfo-flightId'>{dataa.flightID[0] + dataa.flightID[1]}-{dataa.flightID[dataa.flightID.length - 3] + dataa.flightID[dataa.flightID.length - 2] + dataa.flightID[dataa.flightID.length - 1]}</div>
                  </div>
                  <div className='flightinfo-cardPhase2st'><svg width="9" height="97" viewBox="0 0 9 97"><g fill="none" fillRule="evenodd"><circle fill="#999" cx="4.5" cy="4.5" r="4.5"></circle><circle fill="#999" cx="4.5" cy="92.5" r="4.5"></circle><path stroke="#999" strokeLinecap="square" strokeDasharray="7" d="M4.5 7v84"></path></g></svg></div>
                  <div className='flightinfo-cardPhase3st flex flexc'>
                    <div className='flexa'><h2 className='flgihtinfo-departureTime'>{dataa.departureTime}</h2>&nbsp;&nbsp;&nbsp;<p className='flgihtinfo-source'>{dataa.source}</p></div>
                    <div className='clocksvg flexa'><svg width="20" height="20"><g fill="#4D4D4D" fillRule="evenodd"><path d="M19.202 6.102c-1.055-2.459-2.847-4.246-5.325-5.304A9.83 9.83 0 009.984 0a9.728 9.728 0 00-3.882.798C3.643 1.853 1.844 3.64.787 6.102A9.732 9.732 0 000 9.984c0 1.356.258 2.659.787 3.893 1.057 2.462 2.857 4.26 5.315 5.314a9.728 9.728 0 003.882.798c1.355 0 2.654-.27 3.892-.798 2.48-1.057 4.271-2.856 5.326-5.314A9.782 9.782 0 0020 9.984a9.724 9.724 0 00-.798-3.882zm-1.597 8.3a8.773 8.773 0 01-3.215 3.203 8.613 8.613 0 01-4.406 1.181c-1.192 0-2.33-.23-3.412-.7-1.083-.47-2.017-1.088-2.8-1.87-.781-.781-1.404-1.725-1.87-2.81a8.61 8.61 0 01-.688-3.422c0-1.586.39-3.054 1.17-4.396a8.778 8.778 0 013.204-3.204 8.546 8.546 0 014.396-1.181c1.585 0 3.06.396 4.406 1.18a8.8 8.8 0 013.215 3.205 8.547 8.547 0 011.181 4.396 8.629 8.629 0 01-1.18 4.417z" fillRule="nonzero"></path><path d="M10.618 9.902V4.237c0-.339-.295-.612-.634-.612a.616.616 0 00-.602.612V9.99c0 .011.022.055.022.088a.572.572 0 00.164.492l3.27 3.27a.622.622 0 00.842 0 .59.59 0 000-.854l-3.062-3.083z"></path></g></svg>&nbsp; &nbsp; 0{dataa.duration}:00</div>
                    <div className='flexa'><h2 className='flgihtinfo-arrivalTime'>{dataa.arrivalTime}</h2>&nbsp;&nbsp;&nbsp;<p className='flgihtinfo-source'>{dataa.destination}</p></div>
                  </div>
                </div>
              </div>
              <div className='flightinfo-SecondPart flexa g20'>
                <div className='flightinfo-2-logo flexja'>2</div>
                <h1>Add contact details <br /><p>E-ticket will be sent to this email address</p></h1>
              </div>
              <div className='flightinfo-contactdetails flexj flexc'>
                {!switcherform &&
                  <form onSubmit={(e) => personalInfosenderone(e)} className='flexj flexc'>
                    <label htmlFor="mobile">Mobile number</label>
                    <input type="number" className='flightinfo-mobileinput' onClick={() => { popp("mobile") }} placeholder='Mobile number' ref={inputref} value={phonenumber} onChange={(e) => { seterrorcontact(false); setphonenumber(e.target.value); numbererror(e) }} />
                    <label htmlFor="email">Email address</label>
                    <input type='email' placeholder='Email address' onClick={() => { popp("email") }} value={email} onChange={(e) => { seterrorcontact(false); setemail(e.target.value), emailerror(e) }} />
                    {errorcontact && <p className='errorcontact'>fill the form correctly</p>}
                    <button onClick={() => { popp("button") }}>Submit</button>
                  </form>
                }
              </div>
              <div className='flightinfo-ThirdPart flexa g20'>
                <div className='flightinfo-3-logo flexja'>3</div>
                <h1>Add traveller details</h1>
              </div>
              {switcherform && <>
                <div className='flightinfo-travellerdetails flexj flexc g20'>
                  <label>Billing Address</label>
                  <input className='flightinfo-billinginput' type='text' placeholder='Billing Address' onClick={() => { popp("billingAddress") }} value={details.dbillingAddress} onChange={(e) => { travellerinfo("dbillingAddress", e.target.value) }} />
                  <label>Traveller name and gender</label>
                  <div className='flightinfo-travellerdiv flexa g20'>
                    <input type='text' className='fname' placeholder='First name' value={details.dfname} onChange={(e) => { travellerinfo("dfname", `${e.target.value}`) }} onClick={() => { popp("fname") }} />
                    <input type='text' className='lname' placeholder='Last name' value={details.dlname} onChange={(e) => { travellerinfo("dlname", `${e.target.value}`) }} onClick={() => { popp("lname") }} />
                    <div className='gender flexa b1' onClick={() => { popp("gender") }}>
                      <input type='text' placeholder='Gender' className='b1' value={details.dgender} disabled />
                      <IoIosArrowDown className={pop["gender"] ? "gender-downarrow" : "gender-uparrow"} />
                      {pop["gender"] &&
                        <div className='gender-pop felxa flexc'>
                          <p onClick={() => { travellerinfo("dgender", "Male") }}>Male</p>
                          <p onClick={() => { travellerinfo("dgender", "Female") }}>Female</p>
                        </div>
                      }
                    </div>
                  </div>
                  <label>Nationality</label>
                  <div className='flexa g10'>
                    <div className='country flexa' onClick={() => { popp("country") }} >
                      <input type='text' className='country-input' placeholder='Country (e.g. India)' value={details.dcountry} disabled />
                      <IoIosArrowDown className={pop["country"] ? "country-downarrow" : "country-uparrow"} />
                      {pop["country"] &&
                        <div className='country-pop flexa g10 flexc'>
                          {countries.map((item, index) => (<div key={index} onClick={() => { travellerinfo("dcountry", item) }}>{item}</div>))}
                        </div>
                      }
                    </div>
                    <div className='state flexa' onClick={() => { popp("state") }} >
                      <input type='text' className='state-input' placeholder='state (e.g. India)' value={details.dstate} disabled />
                      <IoIosArrowDown className={pop["state"] ? "state-downarrow" : "state-uparrow"} />
                      {pop["state"] &&
                        <div className='state-pop flexa g10 flexc'>
                          {states.map((item, index) => (<div key={index} onClick={() => { travellerinfo("dstate", item) }}>{item}</div>))}
                        </div>
                      }
                    </div>
                  </div>
                  <div className='flightinfo-buttondiv flex'>
                    <button onClick={() => { setswitcherform(false) }}>back</button>
                    <button onClick={() => { gotopayment(); popp("submitdetails") }}>Submit</button>
                  </div>
                </div>
              </>
              }
            </div>
            <div className='rightdiv flex flexc'>
              <div className='flightinfo-price flexa'><p>Total price</p><h2>₹{caltotalamout()}</h2></div>
              <div className='flightinfo-base-fare flexa'><p>Base fare (travellers)</p>₹{dataa.ticketPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
              <div className='flightinfo-tax flexa'><p>Taxes and fees</p><p>₹{taxCalculate()}</p></div>
              <div className='flightinfo-medical-benifit flexa'><p>Medi-cancel benefit <svg viewBox="0 0 12 12" className="ml-1 c-pointer c-secondary-500" height="14" width="14"><path d="M6 0c3.308 0 6 2.692 6 6s-2.692 6-6 6-6-2.692-6-6 2.692-6 6-6zm0 .75A5.257 5.257 0 00.75 6 5.257 5.257 0 006 11.25 5.257 5.257 0 0011.25 6 5.257 5.257 0 006 .75zm.577 4.525V9.4H5.452V5.275h1.125zM6.015 4.15a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#3366cc" fillRule="evenodd"></path></svg></p> <p><del>₹199</del>&nbsp;<span>Free</span></p></div>
            </div>
          </div>
        </div>
      }
      {!pageLoader &&
        <div className='loader'></div>
      }
    </div>
  )
}
