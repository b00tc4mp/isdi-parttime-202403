import { Route, Routes } from "react-router-dom"

import Store from '../views/Store'
import Stored from '../views/Store/Store/Stored'
import Summary from '../views/Store/Store/Summary'
import Search from '../views/Store/Store/Search'

import TruckLoad from '../views/Store/Departures/TruckLoad'
import TruckLoad2 from '../views/Store/Departures/TruckLoad2'
import TruckLoad3 from '../views/Store/Departures/TruckLoad3'

const StoreRoutes = () => {


  return (
    <Routes>

      <Route path="/Store" element={<Store />} />
      <Route path="/Store/Stored" element={<Stored />} />
      <Route path="/Store/Summary" element={<Summary />} />
      <Route path="/Store/Search" element={<Search />} />

      <Route path="/Departures/TruckLoad" element={<TruckLoad />} />
      <Route path="/Departures/Truckload2" element={<TruckLoad2 />} />
      <Route path="/Departures/Truckload3" element={<TruckLoad3 />} />

    </Routes>

  )
}

export default StoreRoutes
