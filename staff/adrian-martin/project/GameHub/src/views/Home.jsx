import { useState } from 'react';

import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer'

import GameList from './components/GameList/GameList';
import CreateGame from './components/CreateGame/CreateGame';

import './Home.css'

function Home() {
    console.log('Home -> render')

    const [isPanelGame, setIsPanelGame] = useState(false);
    const [gameListRefreshStamp, setGameListRefreshStamp] = useState(0)

    const handleCreatePanelGame = () => {
        setIsPanelGame(!isPanelGame);
    };

    const handleGameCreated = () => {
        setGameListRefreshStamp(Date.now())
    }

    return <div>
        <Header />

        {< GameList refreshStamp={gameListRefreshStamp} />}

        {isPanelGame && <CreateGame onGameCreated={handleGameCreated} />}

        <Footer className='Footer' onCreateGame={handleCreatePanelGame} />
    </div>
}

export default Home