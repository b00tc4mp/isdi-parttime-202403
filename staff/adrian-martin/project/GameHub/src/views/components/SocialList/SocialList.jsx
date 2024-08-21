import { useState, useEffect } from 'react'

import logic from '../../../logic/index'
import ProfileUser from './User/ProfileUser.jsx'

import Header from "../Header/Header"
import Footer from "../Footer/Footer"

import './SocialList.css'

function SocialList() {
    console.log('SocialList -> render')

    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        loadProfiles()
    }, [])

    const loadProfiles = () => {
        try {
            logic.getAllUsers()
                .then(users => {
                    const filteredUsers = users.filter(user => user.id !== logic.getUserId())
                    setProfiles(filteredUsers)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                });
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return <div>
        <Header />
        <div className='List-users'>
            {profiles.map((user, index) =>
                <ProfileUser
                    key={index}
                    user={user}
                />)}
        </div>
        <Footer />
    </div>
}

export default SocialList