import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"

import "./index.css"

import logic from "./logic"

import Register from "./components/views/Register"
import Login from "./components/views/Login"
import Home from "./components/views/Home"
import Alert from "./components/views/components/Alert"

import { Context } from "./useContext"

function App() {
  const [message, setMessage] = useState(null)

  const handleMessage = (message) => setMessage(message)

  const handleAlertAccepted = () => setMessage(null)

  return (
    <Context.Provider value={{ alert: handleMessage }}>
      <Routes>
        <Route path="/register" element={<RenderRegister />} />

        <Route path="/login" element={<RenderLogin />} />

        <Route path="/*" element={<RenderHome />} />
      </Routes>

      {message && <Alert message={message} onAccept={handleAlertAccepted} />}
    </Context.Provider>
  )
}
export default App

const RenderRegister = () => (logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register />)
const RenderLogin = () => (logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login />)
const RenderHome = () => (logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />)
