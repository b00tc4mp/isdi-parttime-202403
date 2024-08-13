import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

import { PiUsersThree } from "react-icons/pi"
import { IoHome } from "react-icons/io5"
import { MdOutlineAddTask } from "react-icons/md";

import Header from "./Header"
import Footer from "./Footer"

import Heading from "../../components/core/Heading"
import Field from "../../components/core/Field"
import Button from "../../components/core/Button"

import View from "../library/View"

import logic from '../../logic/index'
import CreateTask from "./CreateTask";

function TasksList() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        try {
            logic.getUserName()
                .then(user => {
                    setUser(user)
                })
                .catch((error) => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleHomeClick = () => { navigate('/') }
    const handleCreateTask = () => { setShowForm(!showForm) }

    return <View>
        <Header>
            {user?.username && <Heading className="text-2xl" level="1">{user.username}</Heading>}
            {user?.name && <Heading className="text-xl" level="3">{<PiUsersThree size={32} />} {user.name}</Heading>}
        </Header>
        {showForm && <CreateTask onSuccess={() => setShowForm(false)} />}
        <Button onClick={handleCreateTask} >{<MdOutlineAddTask size={32} />}</Button>



        <Footer><Button onClick={handleHomeClick}>{<IoHome size={32} />}</Button></Footer>

    </View>
}

export default TasksList