import { useState, useEffect } from 'react'

import Game from '../Game/Game'
import logic from '../../../logic/index'
import Searcher from '../Searcher/Searcher'

import './GameList.css'

function GameList({ refreshStamp }) {
    console.log('GameList -> render')

    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        loadGames()
    }, [refreshStamp])

    useEffect(() => {
        console.log('Games:', games)
        console.log('Search Query:', searchQuery)
        setFilteredGames(
            games.filter(game =>
                game.title && game.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
    }, [searchQuery, games])

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

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    return (
        <div className='List'>
            <Searcher onSearch={handleSearch} />
            {filteredGames.map((game, index) =>
                <Game
                    key={index}
                    game={game}
                    onGameDeleted={handleGameDeleted}
                    onGameEdited={handleGameEdited} />)}
        </div>
    )
}

export default GameList