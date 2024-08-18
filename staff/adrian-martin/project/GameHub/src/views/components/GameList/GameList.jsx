import { useState, useEffect } from 'react'

import Game from '../Game/Game'
import logic from '../../../logic/index'

function GameList({ refreshStamp }) {
    console.log('GameList -> render')

    const [games, setGames] = useState([])

    useEffect(() => {
        loadGames()
    }, [refreshStamp])

    const loadGames = () => {
        try {
            logic.getAllGames()
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
        <div>
            {games.map(game =>
                <Game
                    key={game.id}
                    game={game}
                    onGameDeleted={handleGameDeleted}
                    onGameEdited={handleGameEdited} />)}
        </div>
    )
}

export default GameList