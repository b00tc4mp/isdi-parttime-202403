import { useNavigate } from "react-router-dom"
import { useState } from 'react'

import { CiLogout } from "react-icons/ci"
import { SlOptions } from "react-icons/sl"

import Heading from '../components/core/Heading'
import Button from '../components/core/Button'
import Img from '../components/core/Img'

import RegisterUserForm from "./components/RegisterUserForm"
import UpdateDataUser from "./components/UpdateDataUser"
import UserProvider from "./components/UserProvider"
import DeleteUser from "./components/DeleteUser"

import Header from './components/Header'
import Footer from "./components/Footer"

import View from './library/View'
import logic from '../logic/index'
function Home() {
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showDeleteUser, setShowDeleteUser] = useState(false)
    const handleLogout = () => {
        logic.logoutUser()

        navigate('/login')
    }

    const handleCalendar = () => { navigate('/calendar') }
    const handleTaskList = () => { navigate('/taskslist') }

    const toggleOptions = () => {
        setShowOptions(!showOptions)
    }
    const handleRegisterUser = () => {
        setShowForm(!showForm)
        setShowOptions(false)
    }

    const handleUpdateDataUser = () => {
        setShowEditForm(!showEditForm)
        setShowOptions(false)
    }

    const handleDeleteUser = () => {
        setShowDeleteUser(!showDeleteUser)
        setShowOptions(!showOptions)
    }

    const handleCancel = () => {
        setShowForm(!showForm)
    }

    const handleDeleteSuccess = () => {
        setShowDeleteUser(!showDeleteUser)
    }

    return (
        <UserProvider>
            {({ user, isAdmin }) => (
                <View>
                    <Header>
                        {user?.name && <Heading className="text-3xl mt-6 mr-10" level="1">{user.name}</Heading>}
                        <div className="flex flex-col items-center justify-center">
                            {user?.avatar && <Img src={user.avatar} alt="user avatar" />}
                            {user?.username && (
                                <Heading className="text-xl mt-2" level="3">
                                    {user.username}
                                </Heading>
                            )}
                        </div>
                    </Header>
                    <div className=" absolute top-[5rem] left-4">
                        <button className="ml-6" onClick={toggleOptions}>
                            <SlOptions size={30} />
                        </button>
                        {showOptions && (
                            <div className="relative left-0  m-1 w-36 bg-green-100 border border-green-800 shadow-lg">
                                {isAdmin && <button className="m-2 w-32 border-t border-green-800" onClick={handleRegisterUser}>Register User</button>}
                                {isAdmin && <button className="m-2 w-32 border-t border-green-800" onClick={handleDeleteUser}>Delete User</button>}
                                <button className="m-2 w-32 border-t border-green-800" onClick={handleUpdateDataUser}>Edit Profile</button>
                            </div>
                        )}
                    </div>
                    <div className="mt-[12rem]">
                        <div className="flex flex-col items-center m-2 gap-3" onClick={handleCalendar}>
                            <img src="https://tse2.mm.bing.net/th?id=OIG4.DDKSIFGAp8wr01ZhK.yc&pid=ImgGn" className="w-60 h-52" />
                            <Button className="mt-5" onClick={handleCalendar}>CALENDAR</Button>
                        </div>
                        <div className="flex flex-col items-center m-2 gap-3" onClick={handleTaskList}>
                            <img src="https://tse1.mm.bing.net/th?id=OIG2.T9B8HYpRLZMjs_53IlWZ&pid=ImgGn" className="w-60 h-52" />
                            <Button className="mb-6" onClick={handleTaskList}>TASKS</Button>
                        </div>
                    </div>
                    {isAdmin && showForm && <RegisterUserForm onSuccessRegister={() => setShowForm(false)} onCancelSuccess={handleCancel} />}
                    {isAdmin && showDeleteUser && <DeleteUser onSuccessDeleteUser={() => setShowDeleteUser(false)} onDeleteSuccess={handleDeleteSuccess} />}
                    {showEditForm && <UpdateDataUser userId={user.id} onSuccessEdit={() => setShowEditForm(false)} />}
                    <Footer>
                        <Button onClick={handleLogout}>{<CiLogout size={32} />}</Button>
                    </Footer>
                </View>
            )}
        </UserProvider>
    )
}


export default Home