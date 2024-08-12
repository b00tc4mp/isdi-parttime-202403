import { Routes, Route, Navigate } from "react-router-dom"

import logic from "./logic";

import Login from "./views/Login";
import Register from "./views/Register";
import Workouts from "./views/Workouts";
import Achievements from "./views/Achievements";
import Feed from "./views/Feed";
import Amrap from "./views/Amrap";
import Emom from "./views/Emom";
import ForTime from "./views/ForTime";
import Benchmark from "./views/Benchmark";
import Home from "./views/Home";

//TODO hacer una pagina de home
export default function App() {
    console.log("App -> render")

    return <Routes>

        <Route path="/login" element={<RenderLogin />} />

        <Route path="/register" element={<RenderRegister />} />

        <Route path="/*" element={<RenderHome />} />
        
    </Routes>
}

const RenderRegister = () => (logic.isUserLoggedIn() ? <Navigate to="/workouts" /> : <Register />)
const RenderLogin = () => (logic.isUserLoggedIn() ? <Navigate to="/workouts" /> : <Login />)
const RenderHome = () => (logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />)
