import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

import { PiUsersThree } from "react-icons/pi"
import { GrUserNew } from "react-icons/gr"
import { CiLogout } from "react-icons/ci"

import Header from './components/Header'
import Heading from '../components/core/Heading'
import Button from '../components/core/Button'

import View from './library/View'
import RegisterUserForm from "./library/registerUserForm"

import logic from '../logic/index'
import Footer from "./components/Footer"

function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [isAdmin, setAdmin] = useState(false)

    const handleLogout = () => {
        logic.logoutUser()

        navigate('/login')
    }

    useEffect(() => {
        try {
            logic.getUserName()
                .then(user => {
                    setUser(user)
                    setAdmin(user?.role === 'admin')
                })
                .catch((error) => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleCalendar = () => { navigate('/calendar') }

    const handleLogoClick = () => {
        setShowForm(!showForm)
    }

    return (
        <View >

            <Header>
                <Heading className="text-3xl" level={1}>FAMILY SYNC</Heading>
                {user?.name && <Heading className="Name" level="3">{<PiUsersThree size={32} />} {user.name}</Heading>}

            </Header>

            {user?.username && <Heading className="flex justify-center mt-5 text-2xl" level="3">{user.username}</Heading>}



            <div className="flex flex-col items-center mt-10 gap-3" onClick={handleCalendar}>
                <img src="https://tse2.mm.bing.net/th?id=OIG4.DDKSIFGAp8wr01ZhK.yc&pid=ImgGn" className="w-72 h-56" />

                <Button className="mt-5" onClick={handleCalendar}>CALENDAR</Button>
            </div>

            <div className="flex flex-col items-center mt-10 gap-3">
                <img src="https://tse1.mm.bing.net/th?id=OIG2.T9B8HYpRLZMjs_53IlWZ&pid=ImgGn" className="w-72 h-56" />

                <Button className="mb-6">TASKS</Button>
            </div>


            {isAdmin && showForm && <RegisterUserForm onSuccess={() => setShowForm(false)} />}

            <Footer className="flex justify-between">
                <div className="flex gap-10">
                    {isAdmin && <Button onClick={handleLogoClick} >{<GrUserNew size={32} />}</Button>}
                    <Button onClick={handleLogout}>{<CiLogout size={32} />}</Button>
                </div>
            </Footer>
        </View>
    )

}

export default Home