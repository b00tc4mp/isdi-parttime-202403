import './index.css'
import HeaderMenu from './components/HeaderMenu'
import { BrowserRouter } from "react-router-dom"
import StoreRoutes from './routes/StoreRoutes'
import UsersRoutes from './routes/UsersRoutes'
import VehiclesRoutes from './routes/VehiclesRoutes'



function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <HeaderMenu/>
        <UsersRoutes/>
        <StoreRoutes/>
        <VehiclesRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App