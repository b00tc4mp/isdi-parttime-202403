import { Route, Routes} from "react-router-dom"

import Vehicles from '../views/Vehicles'
import Van1 from "../views/Vehicles/Van1"
import Van2 from "../views/Vehicles/Van2"
import HistoricalVan1 from "../views/Vehicles/Van1/historical"
import HistoricalVan2 from "../views/Vehicles/Van2/historical"


const VehiclesRoutes = () => {


  return (
    <Routes>

      <Route path="/Vehicles" element={<Vehicles />} />
      <Route path="/Vehicles/Van1" element={<Van1 />} />
      <Route path="/Vehicles/Van2" element={<Van2 />} />
      <Route path="/Vehicles/Van1/Historical" element={<HistoricalVan1 />} />
      <Route path="/Vehicles/Van2/Historical" element={<HistoricalVan2 />} />

    </Routes>

  )
}

export default VehiclesRoutes
