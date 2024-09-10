import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { CiLogout } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import Button from '../components/core/Button'
import AddTaskForm from './components/AddTaskForm'
import HomeScreen from './components/HomeScreen'
import Link from '../components/core/Link'
import Users from './Users'
import AvailableTasks from './AvailableTasks'
import Profile from './Profile';

import logic from '../logic'

import './Home.css'

function Home({ onUserLoggedOut }) {
    const [page, setPage] = useState('home')
    const [addTaskForm, setAddTaskForm] = useState(false)
    
    const navigate = useNavigate()

    const handleLogout = () => {
        logic.logout()
        onUserLoggedOut()
    }

    const handleGoToHome = () => {
        handleNavigateTo('home')
        navigate('/')
    }

    const handleGoToSearchTasks = () => {
        handleNavigateTo('available-tasks')
        navigate('/available-tasks')
    }

    const handleGoToUsers = () => {
        handleNavigateTo('users')
        navigate('/users')
    }

    const handleGoToProfile = () => {
        handleNavigateTo('profile')
        navigate('/profile')
    }

    const handleNavigateTo = (url) => setPage(url)

    const handleAddTaskClick = () => setAddTaskForm(true)

    const handleProcessFinishClick = () => setAddTaskForm(false)

    return <div className='container grid'>
        <nav className='flex justify-between items-center px-4 shadow shadow-gray-300 w-screen'>
            <p>Daily Work</p>
            {/*<a href="">{<CiMenuBurger/>}</a>*/}
            <Link onClick={handleLogout}>{<CiLogout/>}</Link>
        </nav>
        <div className='overflow-scroll py-4 body-grid'>
            <Routes>
                <Route path='/available-tasks' element={<AvailableTasks/>} />
                <Route path='/users' element={<Users/>} />
                <Route path='/profile' element={<Profile/>} />
            </Routes>

            {addTaskForm && <AddTaskForm onProcessFinished={handleProcessFinishClick} />}
            {page === 'home' && <HomeScreen/>}
       </div>

        <footer className='flex justify-around items-center shadow shadow-gray-400'>
            <Button className='border-0' onClick={()=> handleGoToHome()}>{<GoHomeFill/>}</Button>
            <Button className='border-0' onClick={()=> handleGoToSearchTasks()}>{<IoSearchOutline />}</Button>
            <Button className='border-0' onClick={()=> handleAddTaskClick()}>{<IoIosAdd/>}</Button>
            <Button className='border-0' onClick={handleGoToUsers}>{<FiUsers/>}</Button>
            <Button className='border-0' onClick={()=> handleGoToProfile()}>{<CgProfile />}</Button>
        </footer>
    </div>
}

export default Home