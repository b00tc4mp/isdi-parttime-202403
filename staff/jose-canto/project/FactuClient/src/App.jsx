import { Routes, Route, Navigate } from "react-router-dom"

import Login from "./components/view/Login"
import Register from "./components/view/Register"
import Home from "./components/view/Home"
import CustomerList from "./components/view/CustomerList"
import CustomerProfile from "./components/view/CustomerProfile"
import UsersProfile from "./components/view/UserProfile"

import logic from "./logic/index"

import "./global.css"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RenderHome />} />
        <Route path="/login" element={<RenderLogin />} />
        <Route path="/register" element={<RenderRegister />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/profile/:customerId" element={<CustomerProfile />} />
        <Route path="/users/profile/" element={<UsersProfile />} />
      </Routes>
    </>
  )
}

export default App

const RenderHome = () => (logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />)
const RenderLogin = () => (logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login />)
const RenderRegister = () => (logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register />)
