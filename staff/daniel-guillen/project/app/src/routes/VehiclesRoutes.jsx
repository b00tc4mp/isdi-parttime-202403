import { Route, Routes} from "react-router-dom"

import Vehicles from '../views/Vehicles'



const VehiclesRoutes = () => {


  return (
    <Routes>

      <Route path="/Vehicles" element={<Vehicles />} />
      {/* <Route path="/Vehicles/Historical" element={<Vehicles />} /> */}

    </Routes>

  )
}

export default VehiclesRoutes
