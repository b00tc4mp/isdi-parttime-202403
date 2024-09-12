import { useState/*, useEffect*/ } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { CiLogout } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

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

    /*const [user, setUser] = useState([])

    useEffect(() => {
        loadUser()
    })

    const loadUser = () => {
        try {
            logic.getMyProfile()
                .then(user => {
                    setUser(user)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }*/
    
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
                {/*<Route path='/profile' element={<Profile user={user}/>} />*/}
            </Routes>

            {addTaskForm && <AddTaskForm onProcessFinished={handleProcessFinishClick} />}
            {page === 'home' && <HomeScreen/>}
       </div>

        <footer className='flex justify-around items-center shadow shadow-gray-400'>
            {page === 'home' && <Button className='border-0' onClick={()=> handleGoToHome()}>{<GoHomeFill/>}</Button>}
            {page !== 'home' && <Button className='border-0' onClick={()=> handleGoToHome()}>{<GoHome/>}</Button>}

            {page === 'available-tasks' && <Button className='border-0' onClick={()=> handleGoToSearchTasks()}>{<IoSearchSharp />}</Button>}
            {page !== 'available-tasks' && <Button className='border-0' onClick={()=> handleGoToSearchTasks()}>{<IoSearchOutline />}</Button>}
            
            {addTaskForm === true && <Button className='border-0' onClick={()=> handleAddTaskClick()}>{<IoMdAdd/>}</Button>}
            {addTaskForm === false && <Button className='border-0' onClick={()=> handleAddTaskClick()}>{<IoIosAdd/>}</Button>}
            
            {page === 'users' && <Button className='border-0' onClick={handleGoToUsers}>{<HiUsers/>}</Button>}
            {page !== 'users' && <Button className='border-0' onClick={handleGoToUsers}>{<HiOutlineUsers/>}</Button>}
            
            {page === 'profile' && <Button className='border-0' onClick={()=> handleGoToProfile()}>{<FaUserCircle/>}</Button>}
            {page !== 'profile' && <Button className='border-0' onClick={()=> handleGoToProfile()}>{<FaRegUserCircle/>}</Button>}
            
            {/*((typeof user.name !== 'undefined') || (typeof user.surname !== 'undefined')) && <Button className='circle-button' onClick={()=> handleGoToProfile()}>{user.name.substr(0,1)}{user.surname.substr(0,1)}</Button>*/}
            {/*((typeof user.name === 'undefined') || (typeof user.surname === 'undefined')) && <Button className='circle-button' onClick={()=> handleGoToProfile()}>{<CgProfile/>}</Button>*/}
        </footer>
    </div>
}

export default Home