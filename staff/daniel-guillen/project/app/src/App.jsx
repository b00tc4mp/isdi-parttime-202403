import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import './index.css'
// import ItemListContainer from './components/ItemListContainer'
import Menu from './components/Menu'
import Home from './views/Home'
import Store from './views/Store'
// import Departures from './views/Departures'
// import Fleet from './views/Fleet'
// import Users from './views/Users'

function App() {

  return (
<div className='App'>
  <BrowserRouter>
    
    <Menu />
    
    <Routes>
      
      {/* <Route path="/" element={<ItemListContainer />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      {/* <Route path="/departures" element={<Departures />} />
      <Route path="/fleet" element={<Fleet />} />
      <Route path="/users" element={<Users />} /> */}
    
    </Routes>

  </BrowserRouter>

</div>
  )
}

export default App
