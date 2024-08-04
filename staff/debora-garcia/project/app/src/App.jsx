import { Routes, Route } from "react-router-dom"
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Workouts from "./views/Workouts";
import Achievements from "./views/Achievements";
import Feed from "./views/Feed";

export default function App() {
    console.log("App -> render")

    return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/workouts" element={<Workouts />} />
    <Route path="/achievements" element={<Achievements />} />
    <Route path="/feed" element={<Feed />} />
    
    </Routes>
}