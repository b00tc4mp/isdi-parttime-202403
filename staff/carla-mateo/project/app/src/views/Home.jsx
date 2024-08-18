import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

import { GrUserNew } from "react-icons/gr"
import { CiLogout } from "react-icons/ci"

import Heading from '../components/core/Heading'
import Button from '../components/core/Button'
import Img from '../components/core/Img'

import RegisterUserForm from "./components/RegisterUserForm"
import UserProvider from "./components/UserProvider"
import Header from './components/Header'
import Footer from "./components/Footer"

import View from './library/View'
import logic from '../logic/index'


function Home() {
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const handleLogout = () => {
        logic.logoutUser()

        navigate('/login')
    }

    const handleCalendar = () => { navigate('/calendar') }
    const handleTaskList = () => { navigate('/taskslist') }

    const handleRegisterUser = () => {
        setShowForm(!showForm)
    }

    return (
        <UserProvider>
            {({ user, isAdmin }) => (
                <View>
                    <Header>
                        {user?.username && <Heading className="text-3xl mt-6 mr-10" level="1">{user.name}</Heading>}
                        <div>
                            {user?.avatar && <Img src={user.avatar} alt="user avatar" />}
                            {user?.name && <Heading className="text-xl" level="3"> {user.username}</Heading>}
                        </div>
                    </Header>

                    <div className="flex flex-col items-center mt-10 gap-3" onClick={handleCalendar}>
                        <img src="https://tse2.mm.bing.net/th?id=OIG4.DDKSIFGAp8wr01ZhK.yc&pid=ImgGn" className="w-72 h-56" />
                        <Button className="mt-5" onClick={handleCalendar}>CALENDAR</Button>
                    </div>

                    <div className="flex flex-col items-center mt-10 gap-3" onClick={handleTaskList}>
                        <img src="https://tse1.mm.bing.net/th?id=OIG2.T9B8HYpRLZMjs_53IlWZ&pid=ImgGn" className="w-72 h-56" />
                        <Button className="mb-6" onClick={handleTaskList}>TASKS</Button>
                    </div>

                    {isAdmin && showForm && <RegisterUserForm onSuccess={() => setShowForm(false)} />}

                    <Footer className="flex justify-between">
                        <div className="flex gap-10">
                            {isAdmin && <Button onClick={handleRegisterUser} >{<GrUserNew size={32} />}</Button>}
                            <Button onClick={handleLogout}>{<CiLogout size={32} />}</Button>
                        </div>
                    </Footer>
                </View>
            )}
        </UserProvider>
    )
}


export default Home