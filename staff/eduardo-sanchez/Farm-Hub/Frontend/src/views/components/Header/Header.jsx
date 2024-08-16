import { Link, useNavigate } from 'react-router-dom'

import logic from '../../../logic'

import './Header.css'
import Title from '../../../components/core/Title'
import Button from '../../../components/core/Button'
// import Link from '../../../components/core/Link'

function Header({ }) {
    console.log('Header -> render')

    const navigate = useNavigate()

    const user = ''

    const handleLogout = () => {
        logic.logoutUser()
        navigate('/login')
    }

    return <header className="Header">

        <h1 className='UsernameTitle'>{user.username ? user.username : 'notloggedin'}</h1>
        <Title>Farm-Hub</Title>
        <div className='LogoutButtonContainer'>

            <button className='LogoutButton' onClick={handleLogout}>Logout</button>

        </div>

    </header >





}

export default Header