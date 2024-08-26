import { useState, useEffect } from 'react'
import logic from '../../../logic/index'
import ProfileUser from './User/ProfileUser.jsx'
import Searcher from '../Searcher/Searcher.jsx'
import ScrollTopButton from '../ScrollTopButton/ScrollTopButton.jsx'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import './SocialList.css'

function SocialList() {
    const [profiles, setProfiles] = useState([])
    const [filteredUser, setFilteredUser] = useState([])
    const [searchQueryUser, setSearchQueryUser] = useState('')

    useEffect(() => {
        loadProfiles()
    }, [])

    useEffect(() => {
        setFilteredUser(
            profiles.filter(user =>
                user.username && user.username.toLowerCase().includes(searchQueryUser.toLowerCase())
            )
        )
    }, [searchQueryUser, profiles])

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
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleSearchUser = query => {
        setSearchQueryUser(query)
    }

    return (
        <div>
            <Header />
            <div className='List-users'>
                <Searcher onSearch={handleSearchUser} />
                {filteredUser.map(user =>
                    <ProfileUser
                        key={user.id}
                        user={user}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SocialList