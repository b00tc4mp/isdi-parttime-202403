import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faUser, faUsers, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import logic from '../logic'
import { useEffect, useState } from 'react';

import View from '../components/library/View/View'
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer'
import Burger from './components/Burger/Burger'

import Button from '../components/core/Button/Button'
import GameList from './components/GameList/GameList';
import CreateGame from './components/CreateGame/CreateGame';

import './Home.css'

function Home() {
    console.log('Home -> render')

    const [isPanelGame, setIsPanelGame] = useState(false);
    const [gameListRefreshStamp, setGameListRefreshStamp] = useState(0)

    const navigate = useNavigate()

    const handleLogOut = () => {
        logic.logOutUser();

        navigate('/login')
    };

    const handleCreatePanelGame = () => {
        setIsPanelGame(!isPanelGame);
    };

    const handleGameCreated = () => {
        setGameListRefreshStamp(Date.now())
    }

    return <View>
        <Header>
            <Burger>
                <div className='Link-menu-burguer'>
                    <div className='Icon'><FontAwesomeIcon icon={faHouseChimney} /></div>
                    <Link to='/'  >Game List</Link>
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

        </Header>

        {< GameList refreshStamp={gameListRefreshStamp} />}

        {isPanelGame && <CreateGame onGameCreated={handleGameCreated} />}

        <Footer onCreateGame={handleCreatePanelGame} />
    </View>
}

export default Home