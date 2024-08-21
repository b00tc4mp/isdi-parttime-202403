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
    const [page, setPage] = useState('')
    
    const navigate = useNavigate()

    const handleLogout = () => {
        logic.logout()
        onUserLoggedOut()
    }

    const handleGoToUsers = () => {
        handleNavigateTo('')
        navigate('/users')
    }

    const handleNavigateTo = (url) => setPage(url)

    const handleAddTaskClick = () => setPage('')

    const handleCancelClick = () => setPage('')

    return <div className="container grid">
        <nav className="flex justify-between items-center px-4 shadow shadow-gray-300">
            <a href="">Menu</a>
            <Link onClick={handleLogout}>Logout</Link>
        </nav>
        <div className="py-4">
            <View>
                <nav>
                    <Button className="border-gray-300 rounded-tr-none rounded-br-none" onClick={()=> handleNavigateTo('home')}>My Tasks</Button>
                    <Button className="border-gray-300 rounded-none" onClick={()=> handleNavigateTo('in-progress')}>In Progress</Button>
                    <Button className="border-gray-300 rounded-none" onClick={()=> handleNavigateTo('private')}>Private</Button>
                    <Button className="border-gray-300 rounded-tl-none rounded-bl-none" onClick={()=> handleNavigateTo('finished')}>Finished</Button>
                </nav>

                { (() => {
                switch (page) {
                    case 'home': return <MyTaskList/>
                    case 'in-progress': return <MyInProgressTaskList/>
                    case 'private': return <MyPrivateTaskList/>
                    case 'finished': return <MyFinishedTaskList/>
                    case 'add': return <AddTaskForm onCancelAddTaskClick={handleCancelClick} onTaskAdded={handleAddTaskClick}/>
                    default: return null
                }
                }) () }

                <Routes>
                    <Route path="/users" element={<Users/>} />
                </Routes>
            </View>
       </div>
        <footer className="flex justify-around items-center shadow shadow-gray-400">
            <Button className="border-0" onClick={()=> handleNavigateTo('home')}>Home</Button>
            <Button className="border-0" onClick={()=> handleNavigateTo('add')}>+</Button>
            <Button className="border-0" onClick={handleGoToUsers}>Users</Button>
        </footer>
    </div>
}

export default Home