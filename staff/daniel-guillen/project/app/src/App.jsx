import { BrowserRouter, Route, Routes } from "react-router-dom"

import './index.css'
import HeaderMenu from './components/HeaderMenu'
import Home from './views/Home'
import Stored from './views/Store/Stored'
import Summary from './views/Store/Summary'
import Search from './views/Store/Search'
import TruckLoad1 from './views/TruckLoad/TruckLoad1'
import TruckLoad2 from './views/TruckLoad/TruckLoad2'
import TruckLoad3 from './views/TruckLoad/TruckLoad3'
import Fleet from './views/Fleet'

// import Users from './views/Users'

function App() {

  return (
<div className='App'>
  <BrowserRouter>
    
    <HeaderMenu />
    
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/stored" element={<Stored />} />
      <Route path="/Store/Summary" element={<Summary />} />
      <Route path="/Store/Search" element={<Search />} />
      <Route path="/TruckLoad1" element={<TruckLoad1 />} />
      <Route path="/Truckload2" element={<TruckLoad2 />} />
      <Route path="/Truckload3" element={<TruckLoad3 />} />
      {/* <Route path="/Truckload/Search" element={<Search />} /> */}
      <Route path="/fleet" element={<Fleet />} />
      {/* <Route path="/users" element={<Users />} /> */}
    
    </Routes>

  </BrowserRouter>

</div>
  )
}

export default App
