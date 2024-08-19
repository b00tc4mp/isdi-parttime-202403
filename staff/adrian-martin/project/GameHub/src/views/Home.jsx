import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import View from '../components/library/View/View'
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer'

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
        <Header />

        {< GameList refreshStamp={gameListRefreshStamp} />}

        {isPanelGame && <CreateGame onGameCreated={handleGameCreated} />}

        <Footer className='Footer' onCreateGame={handleCreatePanelGame} />
    </View>
}

export default Home