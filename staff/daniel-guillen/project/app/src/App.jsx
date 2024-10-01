import { useState, useEffect } from 'react'
import './index.css'
import Header from './components/Header'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'
// Logic
import isUserLoggedIn from './logic/isUserLoggedIn'
// UserRoutes
import Login from './views/Login'
import Home from './views/Home'
import Admin from './views/Admin'
import Register from './views/Admin/Register'
import Users from './views/Admin/Users'
// StoreRutes
import Store from './views/Store'
import Stored from './views/Store/Store/Stored'
import Summary from './views/Store/Store/Summary'
import Search from './views/Store/Store/Search'
import Departures from './views/Store/Departures/Loads'
import SearchLoad from './views/Store/Departures/Search'
// VehiclesRoutes
import Vehicles from './views/Vehicles'
import Historical from './views/Vehicles/Historical'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Comprobamos si el usuario está autenticado
    setIsAuthenticated(isUserLoggedIn())
  }, [])

  return (
    <div className='App'>
      <BrowserRouter>
        {/* Pasamos setIsAuthenticated al Header para manejar el logout */}
        <Header setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          {/* Redirige a Home si está autenticado */}
          <Route path='/Login' element={isAuthenticated ? <Navigate to='/' /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

          {/* Rutas privadas (protegidas por autenticación) */}{
            isAuthenticated ? < > 
            {/* <Route path='/' element={isAuthenticated ? <Home /> : <Navigate to='/Login' />} />
            <Route path='/Admin' element={isAuthenticated ? <Admin /> : <Navigate to='/Login' />} />
            <Route path='/Admin/Register' element={isAuthenticated ? <Register /> : <Navigate to='/Login' />} />
            <Route path='/Admin/Users' element={isAuthenticated ? <Users /> : <Navigate to='/Login' />} />
  
            <Route path='/Store' element={isAuthenticated ? <Store /> : <Navigate to='/Login' />} />
            <Route path='/Store/Stored' element={isAuthenticated ? <Stored /> : <Navigate to='/Login' />} />
            <Route path='/Store/Summary' element={isAuthenticated ? <Summary /> : <Navigate to='/Login' />} />
            <Route path='/Store/Search' element={isAuthenticated ? <Search /> : <Navigate to='/Login' />} />
  
            <Route path='/Departures' element={isAuthenticated ? <Departures /> : <Navigate to='/Login' />} />
            <Route path='/Departures/Search' element={isAuthenticated ? <SearchLoad /> : <Navigate to='/Login' />} />
  
            <Route path='/Vehicles' element={isAuthenticated ? <Vehicles /> : <Navigate to='/Login' />} />
            <Route path='/Vehicles/Historical/:vehicleId' element={isAuthenticated ? <Historical /> : <Navigate to='/Login' />} /> */}

            <Route path='/' element={ <Home /> } />
            <Route path='/Admin' element={ <Admin /> } />
            <Route path='/Admin/Register' element={ <Register /> } />
            <Route path='/Admin/Users' element={ <Users /> } />
  
            <Route path='/Store' element={ <Store /> } />
            <Route path='/Store/Stored' element={ <Stored /> } />
            <Route path='/Store/Summary' element={ <Summary /> } />
            <Route path='/Store/Search' element={ <Search /> } />
  
            <Route path='/Departures' element={ <Departures /> } />
            <Route path='/Departures/Search' element={ <SearchLoad /> } />
  
            <Route path='/Vehicles' element={ <Vehicles /> } />
            <Route path='/Vehicles/Historical/:vehicleId' element={ <Historical /> } />
            
            </> : <Route path='/*' element={ <Login setIsAuthenticated={setIsAuthenticated} />} />

          
        }
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App