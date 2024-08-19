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

    const handleCreatePanelGame = () => {
        setIsPanelGame(!isPanelGame);
    };

    const handleGameCreated = () => {
        setGameListRefreshStamp(Date.now())
    }

    return <View>
        <Header>
            <Burger />

        </Header>

        {< GameList refreshStamp={gameListRefreshStamp} />}

        {isPanelGame && <CreateGame onGameCreated={handleGameCreated} />}

        <Footer className='Footer' onCreateGame={handleCreatePanelGame} />
    </View>
}

export default Home