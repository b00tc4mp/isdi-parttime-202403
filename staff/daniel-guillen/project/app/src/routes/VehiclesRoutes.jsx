import { Route, Routes} from "react-router-dom"

import Vehicles from '../views/Vehicles'
import Historical from "../views/Vehicles/Historical"



const VehiclesRoutes = () => {


  return (
    <Routes>

      <Route path="/Vehicles" element={<Vehicles />} />
      <Route path="/Vehicles/Historical/:vehicleId" element={<Historical />} />

    </Routes>

  )
}

export default VehiclesRoutes
