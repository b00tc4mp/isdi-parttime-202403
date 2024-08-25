import './index.css'
import HeaderMenu from './components/HeaderMenu'
import { BrowserRouter } from "react-router-dom"
import { useState } from 'react'
import app from './utils/config'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import AppRoutes from '../src/routes/AppRoutes'

const auth = getAuth(app)

function App() {

  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase)
    } else {
      setUser(null)
    }
  })

  return (
    <div className='App'>
      <BrowserRouter>
        <HeaderMenu />
        <AppRoutes user={user} setUser={setUser} />
      </BrowserRouter>
    </div>
  )
}

export default App