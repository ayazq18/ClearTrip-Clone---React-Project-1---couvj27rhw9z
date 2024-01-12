import NavBar from "./NavBar/NavBar.js";
import Flight from "./Home/Flight.js";
// import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Hotel from "./Hotels/Hotel.js";
import Bus from "./Bus/Bus.js";
import FlightTicket from "./Home/FlightTicket.js";
import Login from "./Login/Login.js";
import ImgCorousel from "./Corousel/FlightPage/ImgCorousel.js";

function App() {
  return <div className="app">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavBar/>}>
      <Route index path="/" element={<Flight/>}/>
      <Route path="/flight" element={<Flight/>}/>
      <Route  path="/hotel" element={<Hotel/>}/>
      <Route  path="/bus" element={<Bus/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    {/* <FlightTicket/> */}
  </div>;
}

export default App;
