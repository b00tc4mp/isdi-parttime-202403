import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faUser, faUsers, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import logic from '../logic'
import { useState } from 'react';

import View from '../components/library/View/View'
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer'
import Burger from './components/Burger/Burger'

import Button from '../components/core/Button/Button'

import CreateGame from './components/CreateGame/CreateGame';

import './Home.css'

function Home({ }) {
    console.log('Home -> render')

    const [view, setView] = useState('')
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

    const navigate = useNavigate()

    const handleLogOut = () => {
        logic.logOutUser();

        navigate('/login')
    };

    const handleCreateGameClick = () => {
        setView(view => (view === 'create-game' ? '' : 'create-game'))
    }

    const handleGameCreated = () => {
        setPostListRefreshStamp(Date.now())

        setView('')
    }

    return <View>
        <Header>
            <Burger>
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
            </Burger>

            {view === 'create-game' && <CreateGame onGameCreated={handleGameCreated} />}

        </Header>

        <Footer onCreateGame={handleCreateGameClick} />
    </View>
}

export default Home