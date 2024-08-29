import { useState } from 'react'

import logic from '../../../logic'
import Button from '../../../components/core/Button/Button'

import useContext from '../../useContext'

import './CreateGame.css'
import Input from '../../../components/core/Input/Input'
import Form from '../../../components/core/Form/Form'

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

    if (!isPanelOpen) return null

    return (
        <div className='Container-Panel'>
            <div className='TagGame'>
                <Form className='Game' onSubmit={handleCreateGame}>
                    <Input name='title' className='InputCreate' placeholder='Write the game' />
                    <Input name='image' className='InputCreate' placeholder='Url Image' />
                    <Input name='rating' className='InputCreate' placeholder='Rating 1-10' />
                    <Input name='hours' className='InputCreate' placeholder='Hours Played' />
                    <Button type='submit' className='Button-game'>Create Game</Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateGame