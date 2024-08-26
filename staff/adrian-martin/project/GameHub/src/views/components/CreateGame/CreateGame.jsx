import { useState } from 'react'

import logic from '../../../logic'
import Button from '../../../components/core/Button/Button'

import useContext from '../../useContext'

import './CreateGame.css'

function CreateGame({ onGameCreated }) {
    const [isPanelOpen, setIsPanelOpen] = useState(true)
    const { alert } = useContext()

    const handleCreateGame = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const image = form.image.value
        const rating = parseFloat(form.rating.value)
        const hours = parseFloat(form.hours.value)

        // TODO fix alert the form

        try {
            logic.createGame(title, image, rating, hours)
                .then(() => {
                    setIsPanelOpen(false)
                    onGameCreated()
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    if (!isPanelOpen) return null // No renderiza el compo si esta cerradop el panek

    return (
        <div className='Container-Panel'>
            <div className='TagGame'>
                <form className='Game' onSubmit={handleCreateGame}>
                    <input name='title' className='InputCreate' placeholder='Write the game' />
                    <input name='image' className='InputCreate' placeholder='Url Image' />
                    <input name='rating' className='InputCreate' placeholder='Rating 1-10' />
                    <input name='hours' className='InputCreate' placeholder='Hours Played' />
                    <Button type='submit' className='Button-game'>Create Game</Button>
                </form>
            </div>
        </div>
    )
}

export default CreateGame