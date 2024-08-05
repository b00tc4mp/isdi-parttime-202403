import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faUser, faUsers, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

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
                <div className='Link-menu-burguer'>
                    <div className='Icon'><FontAwesomeIcon icon={faHouseChimney} /></div>
                    <Link to='/' >Game List</Link>
                </div>
                <div className='Link-menu-burguer'>
                    <div className='Icon'><FontAwesomeIcon icon={faUser} /></div>
                    <Link to='/profile' >Profile</Link>
                </div>
                <div className='Link-menu-burguer'>
                    <div className='Icon'><FontAwesomeIcon icon={faUsers} /></div>
                    <Link to='/socialist' >Social List</Link>
                </div>
                <div className='Link-menu-burguer'>
                    <div className='Icon'><FontAwesomeIcon icon={faArrowRightFromBracket} /></div>
                    <Button onClick={handleLogOut} >Log Out</Button>
                </div>
            </Burguer>
        </Header>

        <Footer />
    </View>
}

export default Home