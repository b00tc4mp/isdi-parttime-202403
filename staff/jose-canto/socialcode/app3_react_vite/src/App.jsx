import { Routes, Route, Navigate } from "react-router-dom"

import "./index.css"

import logic from "./logic"

import Register from "./components/views/Register"
import Login from "./components/views/Login"
import Home from "./components/views/components/Home"

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RenderRegister />} />

      <Route path="/login" element={<RenderLogin />} />

      <Route path="/*" element={<RenderHome />} />
    </Routes>
  )
}
export default App

const RenderRegister = () => (logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register />)
const RenderLogin = () => (logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login />)
const RenderHome = () => (logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />)
