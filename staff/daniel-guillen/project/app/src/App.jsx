import { useState, useEffect } from 'react'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'
import './index.css'
// Components
import Header from './components/Header'
import ContextProvider from './context/ContextProvider'
// Logic
import isUserLoggedIn from './logic/users/isUserLoggedIn'
// Main Routes
import Login from './views/Login'
import Home from './views/Home'
// Admin Routes
import Admin from './views/Admin'
import RegisterUser from './views/Admin/registeruser'
import UsersList from './views/Admin/userslist'
// Stored Routes
import Store from './views/Store'
import StoredWaste from './views/Store/StoreWaste/storedwaste'
import StoredWasteSummary from './views/Store/StoreWaste/storedwastesummary'
import SearchStoredWaste from './views/Store/StoreWaste/searchstoredwaste'
// Departures Routes
import RegisterLoad from './views/Store/Departures/registerload'
import SearchDepartures from './views/Store/Departures/searchdepartures'
// Vehicles Routes
import VehicleInspection from './views/Vehicles/vehicleinspection'
import VehicleHistory from './views/Vehicles/vehiclehistory'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {// Comprobamos si el usuario está autenticado
    setIsAuthenticated(isUserLoggedIn())
  }, [])

  return(
      <ContextProvider>

      <div className='App'>
        <BrowserRouter>
          {/* Pasamos setIsAuthenticated al Header para manejar el logout */}
          <Header setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            {/* Redirige a Home si está autenticado */}
            <Route path='/Login' element={isAuthenticated ? <Navigate to='/' /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

            {/* Rutas privadas (protegidas por autenticación) */}
            {isAuthenticated ? (
              <>
                <Route path='/' element={<Home />} />
                <Route path='/Admin' element={<Admin />} />

                <Route path='/Admin/registeruser' element={<RegisterUser />} />
                <Route path='/Admin/userslist' element={<UsersList />} />

                <Route path='/Store' element={<Store />} />
                <Route path='/StoreWaste/storedwaste' element={<StoredWaste />} />
                <Route path='/StoreWaste/storedwastesummary' element={<StoredWasteSummary />} />
                <Route path='/StoreWaste/searchstoredwaste' element={<SearchStoredWaste />} />

                <Route path='/Departures/registerload' element={<RegisterLoad />} />
                <Route path='/Departures/searchdepartures' element={<SearchDepartures />} />

                <Route path='/vehicles/inspection' element={<VehicleInspection />} />
                <Route path='/vehicles/historical/:vehicleId' element={<VehicleHistory />} />
              </>
            ) : (
              <Route path='/*' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            )}
          </Routes>
        </BrowserRouter>
        </div>

        </ContextProvider>
  )
}

export default App