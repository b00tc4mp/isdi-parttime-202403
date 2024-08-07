import { useEffect, useState } from 'react'

import logic from '../../../logic'
import FormWithFeedback from '../../../components/library/FormWithFeedback/FormWithFeedback'
import Button from '../../../components/core/Button/Button'

import './CreateGame.css'

function CreateGame({ onGameCreated }) {

    const handleCreateGame = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const image = form.image.value
        const rating = parseFloat(form.rating.value)
        const hours = parseFloat(form.hours.value)

        try {
            logic.createGame(title, image, rating, hours)
                .then(() => onGameCreated())
                .catch(error => {
                    console.error(error)
                })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='TagGame'>
            <FormWithFeedback className='Game' onSubmit={handleCreateGame}>
                <p className='Text-game'>Write the video game</p>
                <input name='title' className='Input-write' />

                <p className='Text-game'>Url Image</p>
                <input name='image' className='Input-write' />

                <div className='Grade-hours'>
                    <div className='All-grade'>
                        <p className='Text-game'>Rating</p>
                        <input name='rating' className='Input-grade-hours' />
                    </div>
                    <div className='All-grade'>
                        <p className='Text-game'>Hours</p>
                        <input name='hours' className='Input-grade-hours' />
                    </div>
                </div>
                <div className='Button-container'>
                    <Button type='submit' className='Button-game'>Create</Button>
                </div>
            </FormWithFeedback>
        </div>
    )

}

export default CreateGame