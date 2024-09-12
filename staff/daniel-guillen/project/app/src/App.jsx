import './index.css'
import Header from './components/Header'
import { BrowserRouter } from "react-router-dom"
import StoreRoutes from './routes/StoreRoutes'
import UsersRoutes from './routes/UsersRoutes'
import VehiclesRoutes from './routes/VehiclesRoutes'



function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Header/>
        <UsersRoutes/>
        <StoreRoutes/>
        <VehiclesRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App