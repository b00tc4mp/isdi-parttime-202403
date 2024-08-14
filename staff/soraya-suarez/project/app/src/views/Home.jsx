import { useState } from 'react'

import View from '../components/library/View'
import Button from '../components/core/Button'
import AddTaskForm from './components/AddTaskForm'
import Link from '../components/core/Link'
import MyInProgressTaskList from './components/MyInprogressTaskList'

import logic from '../logic'
import './Home.css'

function Home({ onUserLoggedOut }) {

    const [view, setView] = useState(false)

    const handleLogout = () => {
        logic.logout()

        onUserLoggedOut()
    }

    const handleHomeTaskClick = () => setView(view)

    const handleAddTaskClick = () => setView(!view)

    const handleCancelClick = () => setView(!view)

    return <>
        <nav className="bottom-navbar">
            <a href="">Menu</a>
            <Link onClick={handleLogout}>Logout</Link>
        </nav>

        <nav className="main-navbar">
            <a href="">My Tasks</a>
            <a href="">In Progress</a>
            <a href="">Private</a>
            <a href="">Finished</a>
        </nav>

        <View tag="main">
           {view && <AddTaskForm onCancelAddTaskClick={handleCancelClick} onTaskAdded={handleAddTaskClick}/>}
       </View>

        <footer>
            <Button onClick={handleHomeTaskClick}>Home</Button>
            <Button onClick={handleAddTaskClick}>+</Button>
            <Button onClick={handleAddTaskClick}>Users</Button>
        </footer>
    </>
}

export default Home