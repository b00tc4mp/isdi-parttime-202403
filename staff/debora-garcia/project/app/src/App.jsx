import { Routes, Route } from "react-router-dom"
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";

export default function App() {
    console.log("App -> render")

    return <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
}