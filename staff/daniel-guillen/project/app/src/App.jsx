import './index.css'

import HeaderMenu from './components/HeaderMenu'
import Home from './views/Home'
import Store from './views/Store'
import Stored from './views/Store/Store/Stored'
import Summary from './views/Store/Store/Summary'
import Search from './views/Store/Store/Search'
import TruckLoad from './views/Store/Departures/TruckLoad'
import TruckLoad2 from './views/Store/Departures/TruckLoad2'
import TruckLoad3 from './views/Store/Departures/TruckLoad3'
import Vehicles from './views/Vehicles'
import Van1 from "./views/Vehicles/Van1"
import Van2 from "./views/Vehicles/Van2"
import HistoricalVan1 from "./views/Vehicles/Van1/historical"
import HistoricalVan2 from "./views/Vehicles/Van2/historical"
import Admin from './views/Admin'
import Register from './views/Admin/Register'
import Users from './views/Admin/Users'

import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {



  return (
<div className='App'>
  <BrowserRouter>
    
    <HeaderMenu />
    
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/Store" element={<Store />} />
      <Route path="/Store/Stored" element={<Stored />} />
      <Route path="/Store/Summary" element={<Summary />} />
      <Route path="/Store/Search" element={<Search />} />
      <Route path="/Departures/TruckLoad" element={<TruckLoad />} />
      <Route path="/Departures/Truckload2" element={<TruckLoad2 />} />
      <Route path="/Departures/Truckload3" element={<TruckLoad3 />} />
      <Route path="/Vehicles" element={<Vehicles />} />
      <Route path="/Vehicles/Van1" element={<Van1 />} />
      <Route path="/Vehicles/Van2" element={<Van2 />} />
      <Route path="/Vehicles/Van1/Historical" element={<HistoricalVan1 />} />
      <Route path="/Vehicles/Van2/Historical" element={<HistoricalVan2 />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Admin/Register" element={<Register />} />
      <Route path="/Admin/Users" element={<Users />} />
    </Routes>

  </BrowserRouter>

</div>
  )
}

export default App
