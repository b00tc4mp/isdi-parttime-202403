import { useState } from 'react'

import View from '../components/library/View'
import Button from '../components/core/Button'
import AddTaskForm from './components/AddTaskForm'
import Link from '../components/core/Link'
import MyTaskList from './components/MyTasksList'
import MyInProgressTaskList from './components/MyInProgressTaskList'
import MyPrivateTaskList from './components/MyPrivateTaskList'
import MyFinishedTaskList from './components/MyFinishedTaskList'

import logic from '../logic'
import './Home.css'

function Home({ onUserLoggedOut }) {

    const [view, setView] = useState(false)
    const [page, setPage] = useState('home')

    const handleLogout = () => {
        logic.logout()

        onUserLoggedOut()
    }

    const handleNavigateTo = (url) => setPage(url)

    const handleHomeTaskClick = () => setView(view)

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
       </View>

        <footer>
            <Button onClick={handleHomeTaskClick}>Home</Button>
            <Button onClick={handleAddTaskClick}>+</Button>
            <Button onClick={handleAddTaskClick}>Users</Button>
        </footer>
    </>
}

export default Home