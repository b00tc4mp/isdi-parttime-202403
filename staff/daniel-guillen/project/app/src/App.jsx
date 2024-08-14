import { BrowserRouter, Route, Routes } from "react-router-dom"

import './index.css'
// import ItemListContainer from './components/ItemListContainer'
import HeaderMenu from './components/HeaderMenu'
import Home from './views/Home'
import Store from './views/Store'
import Summary from './views/Store/Summary'
import Search from './views/Store/Search'
import Acteco from './views/TruckLoad/Acteco'
import TruckLoad2 from './views/TruckLoad/TruckLoad2'
import TruckLoad3 from './views/TruckLoad/TruckLoad3'

// import Fleet from './views/Fleet'
// import Users from './views/Users'

function App() {

  return (
<div className='App'>
  <BrowserRouter>
    
    <HeaderMenu />
    
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/Store/Summary" element={<Summary />} />
      <Route path="/Store/Search" element={<Search />} />
      <Route path="/Acteco" element={<Acteco />} />
      <Route path="/Truckload2" element={<TruckLoad2 />} />
      <Route path="/Truckload3" element={<TruckLoad3 />} />
      {/* <Route path="/Truckload/Search" element={<Search />} /> */}
      {/* <Route path="/fleet" element={<Fleet />} />
      <Route path="/users" element={<Users />} /> */}
    
    </Routes>

  </BrowserRouter>

</div>
  )
}

export default App
