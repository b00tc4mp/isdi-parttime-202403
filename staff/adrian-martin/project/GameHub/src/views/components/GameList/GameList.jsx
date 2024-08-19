import { useState, useEffect } from 'react'

import Game from '../Game/Game'
import logic from '../../../logic/index'

import './GameList.css'

function GameList({ refreshStamp }) {
    console.log('GameList -> render')

    const [games, setGames] = useState([])

    useEffect(() => {
        loadGames()
    }, [refreshStamp])

    const loadGames = () => {
        try {
            logic.getAllGamesUser()
                .then(games => {
                    console.log('GamesList -> setGames')

                    setGames(games)
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

    const handleGameDeleted = () => loadGames()

    const handleGameEdited = () => loadGames()

    return (
        <div className='List'>
            {games.map((game, index) =>
                <Game
                    key={index}
                    game={game}
                    onGameDeleted={handleGameDeleted}
                    onGameEdited={handleGameEdited} />)}
        </div>
    )
}

export default GameList