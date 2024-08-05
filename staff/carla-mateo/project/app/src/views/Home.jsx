import Button from '../components/core/button/Button'
import logic from '../logic/index'
import { useNavigate } from "react-router-dom"

import './Home.css'
import Header from './components/header/Header'
import Heading from '../components/core/heading/Heading'
import View from './library/View'

function Home({ }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        logic.logoutAdmin()

        navigate('/login')
    }
    return <View>

        <Header>
            <Heading className="FamilySync" level={1}>Family Sync</Heading>
            <Button className="LogoutButton" onClick={handleLogout}>Logout</Button>
        </Header>

    </View>



}

export default Home