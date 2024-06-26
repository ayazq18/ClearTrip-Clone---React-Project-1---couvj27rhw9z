import NavBar from "./NavBar/NavBar.js";
import Flight from "./Home/Flight.js";
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Hotel from "./Hotels/Hotel.js";
import FlightTicket from "./Home/FlightTicket.js";
import ContextAllDataProvider from './ContextAllData.js';
import HotelResults from "./Hotels/HotelResults.js";
import HotelsCardInfo from "./Hotels/HotelsCardInfo.js";
import FlightInfo from "./Home/FlightInfo.js";
import PaymentBooking from "./Home/PaymentBooking.js";
import HotelBooking from "./Hotels/HotelBooking.js";
import HotelPayment from "./Hotels/HotelPayment.js";
import ComingSoon from "./ComingSoon/ComingSoon.js";
import MyTrips from "./Trips/MyTrips.js";
import Bus from "./Bus/Bus.js";
import Support from "./Support/Support.js";

function App() {
  return <div className="app">
    <ContextAllDataProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavBar/>}>
        <Route index element={<Flight/>}/>
        <Route path="/flights" element={<Flight/>}/>
        <Route path="/hotel" element={<Hotel/>}/>
        <Route path="/Bus" element={<Bus/>}/>
        <Route path="/Support" element={<Support/>}/>
        <Route path="/myTrips" element={<MyTrips/>}/>
      </Route>
      <Route path="/flights/:results" element={<FlightTicket/>}/>
      <Route path="/flights/results/:Info" element={<FlightInfo/>}/>
      <Route path="/flights/results/Info/:bookingpage" element={<PaymentBooking/>}/>
      <Route path="/hotels/:results" element={<HotelResults/>}/>
      <Route path="/hotels/results/:hotelcardsinfo" element={<HotelsCardInfo/>}/>
      <Route path="/hotels/results/hotelcardsinfo/:hotelBooking" element={<HotelBooking/>}/>
      <Route path="/hotels/results/hotelcardsinfo/hotelBooking/:hotelPayment" element={<HotelPayment/>}/>
      <Route path="/ComingSoon" element={<ComingSoon/>}/>
    </Routes>
    </BrowserRouter>
    </ContextAllDataProvider>
  </div>;
}

export default App;
