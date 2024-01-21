import NavBar from "./NavBar/NavBar.js";
import Flight from "./Home/Flight.js";
// import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Hotel from "./Hotels/Hotel.js";
import Bus from "./Bus/Bus.js";
import FlightTicket from "./Home/FlightTicket.js";
import Login from "./Login/Login.js";
import Form from "./Form/Form.js";
import Signup from "./Signup/Signup.js";
import ContextAllDataProvider from './ContextAllData.js';
// import { MyContextProvider } from "./Services/index.js";


function App() {
  return <div className="app">
    <ContextAllDataProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavBar/>}>
      <Route index element={<Flight/>}/>
      <Route path="/flights" element={<Flight/>}/>
      <Route  path="/hotel" element={<Hotel/>}/>
      <Route  path="/bus" element={<Bus/>}/>
      </Route>
      <Route  path="/offers" element={<Bus/>}/>
      <Route path="/flights/:results" element={<FlightTicket/>}/>
    </Routes>
    </BrowserRouter>
    </ContextAllDataProvider>
    {/* <FlightTicket/>
     {/* <Login/> */}
    {/* <Form/> */}
    {/* <Signup/> */}
  </div>;
}

export default App;
