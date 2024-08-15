import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import View from '../components/library/View'
import Button from '../components/core/Button'
import AddTaskForm from './components/AddTaskForm'
import Link from '../components/core/Link'
import MyTaskList from './components/MyTasksList'
import MyInProgressTaskList from './components/MyInProgressTaskList'
import MyPrivateTaskList from './components/MyPrivateTaskList'
import MyFinishedTaskList from './components/MyFinishedTaskList'
import Users from './Users'

import logic from '../logic'

import './Home.css'

function Home({ onUserLoggedOut }) {

    const [view, setView] = useState(false)
    const [page, setPage] = useState('home')
    
    const navigate = useNavigate()

    const handleLogout = () => {
        logic.logout()

        onUserLoggedOut()
    }

    const handleGoToUsers = () => navigate('/users')

    const handleNavigateTo = (url) => setPage(url)

    const handleAddTaskClick = () => setView(!view)

    const handleCancelClick = () => setView(!view)

    return <>
        <nav className="bottom-navbar">
            <a href="">Menu</a>
            <Link onClick={handleLogout}>Logout</Link>
        </nav>

        <nav className="main-navbar">
            <Button onClick={()=> handleNavigateTo('home')}>My Tasks</Button>
            <Button onClick={()=> handleNavigateTo('in-progress')}>In Progress</Button>
            <Button onClick={()=> handleNavigateTo('private')}>Private</Button>
            <Button onClick={()=> handleNavigateTo('finished')}>Finished</Button>
        </nav>

        <View tag="main">
           {view && <AddTaskForm onCancelAddTaskClick={handleCancelClick} onTaskAdded={handleAddTaskClick}/>}
       </View>

       <View tag="main">
           { (() => {
            switch (page) {
                case 'home': return <MyTaskList/>
                case 'in-progress': return <MyInProgressTaskList/>
                case 'private': return <MyPrivateTaskList/>
                case 'finished': return <MyFinishedTaskList/>
                default: return null
            }
           }) () }

           <Routes>
                <Route path="/users" element={<Users/>} />
            </Routes>
       </View>

        <footer>
            <Button onClick={()=> handleNavigateTo('home')}>Home</Button>
            <Button onClick={handleAddTaskClick}>+</Button>
            <Button onClick={handleGoToUsers}>Users</Button>
        </footer>
    </>
}

export default Home