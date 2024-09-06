import { Route, Routes } from "react-router-dom"

import Store from '../views/Store'
import Stored from '../views/Store/Store/Stored'
import Summary from '../views/Store/Store/Summary'
import Search from '../views/Store/Store/Search'

import Departures from "../views/Store/Departures"

const StoreRoutes = () => {


  return (
    <Routes>

      <Route path="/Store" element={<Store />} />
      <Route path="/Store/Stored" element={<Stored />} />
      <Route path="/Store/Summary" element={<Summary />} />
      <Route path="/Store/Search" element={<Search />} />

      <Route path="/Departures" element={<Departures />} />

    </Routes>

  )
}

export default StoreRoutes
