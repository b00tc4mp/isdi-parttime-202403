import { Route, Routes, Navigate } from "react-router-dom"
import isUserLoggedIn from "../logic/isUserLoggedIn"

import Login from '../views/Login'
import Home from '../views/Home'

import Admin from '../views/Admin'
import Register from '../views/Admin/Register'
import Users from '../views/Admin/Users'

const UsersRoutes = () => {



  return (
    <Routes>
    
      <Route path="/Login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
    
      <Route path="/" element={<Home />} />

      <Route path="/Admin" element={<Admin />} />
      <Route path="/Admin/Register" element={<Register />} />
      <Route path="/Admin/Users" element={<Users />} />
    </Routes>

  )
}

export default UsersRoutes
