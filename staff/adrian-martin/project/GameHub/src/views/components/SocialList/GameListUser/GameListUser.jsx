import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import GameUser from './GameUser/GameUser'
import logic from '../../../../logic/index'

import Searcher from '../../Searcher/Searcher'
import ScrollTopButton from '../../ScrollTopButton/ScrollTopButton'

import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'

import './GameListUser.css'

function GameListUser() {
    console.log('GameList -> render')

    const { userId } = useParams()
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        loadGames()
    }, [userId])

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
            logic.getAllGamesTargetUser(userId)
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

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    return (<>
        <Header />
        <div className='List'>
            <Searcher onSearch={handleSearch} />
            <ScrollTopButton />
            {filteredGames.map((game, index) =>
                <GameUser
                    key={index}
                    game={game}
                />)}
        </div>
        <Footer />
    </>
    )
}

export default GameListUser