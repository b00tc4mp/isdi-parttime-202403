import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import logic from '../logic'

import View from '../components/library/View/View'
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer'
import Burguer from './components/Burguer/Burguer'

import Button from '../components/core/Button/Button'

import './Home.css'

function Home({ }) {
    console.log('Home -> render')
    const navigate = useNavigate()

    const handleLogOut = () => {
        logic.logOutUser();

        navigate('/login')
    };

    return <View>
        <Header>
            <Burguer>
                <Link to='/' >Game List</Link>
                <Link to='/profile' >Profile</Link>
                <Link to='/socialist' >Social List</Link>
                <Button onClick={handleLogOut} >Log Out</Button>
            </Burguer>
        </Header>

        <Footer />
    </View>
}

export default Home