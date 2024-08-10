import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

import './Home.css'

import Header from './components/header/Header'
import Heading from '../components/core/heading/Heading'
import Button from '../components/core/button/Button'

import View from './library/View'

import logic from '../logic/index'

function Home() {
    const navigate = useNavigate()
    const [name, setName] = useState('')

    const handleLogout = () => {
        logic.logoutUser()

        navigate('/login')
    }

    useEffect(() => {
        try {
            logic.getUserName()
                .then((name) => {
                    setName(name)
                })
                .catch((error) => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleCalendar = () => { navigate('/calendar') }

    return <View>

        <Header>
            <Heading className="FamilySync" level={1}>FAMILY SYNC</Heading>
            <Heading className="Name" level="3">{name}</Heading>
            <Button className="LogoutButton" onClick={handleLogout}>Logout</Button>
        </Header>

        <Button className="Calendar" onClick={handleCalendar}>Calendar</Button>

    </View>
}

export default Home