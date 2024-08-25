import { useState } from 'react';
import Button from '../../../../components/core/Button/Button';
import './PanelEditGame.css';
import logic from '../../../../logic';

function PanelEditGame({ game, onGameEdited, onCancel }) {
    const [formData, setFormData] = useState({
        title: game.title,
        image: game.image,
        rating: game.rating,
        hours: game.hours
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleEditGame = event => {
        event.preventDefault()

        const { title, image, rating, hours } = formData

        const updates = {
            title,
            image,
            rating: parseFloat(rating),
            hours: parseFloat(hours)
        }

        try {
            logic.editGame(game.id, updates)
                .then(() => {
                    onGameEdited()
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className='Container'>
            <div className='EditGamePanel'>
                <form className='EditGame' onSubmit={handleEditGame}>
                    <input
                        className='InputPanel'
                        type='text'
                        placeholder='Game Title'
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <input
                        className='InputPanel'
                        type='text'
                        placeholder='Image URL'
                        name='image'
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                    <input
                        className='InputPanel'
                        type='number'
                        placeholder='Rating 1-10'
                        name='rating'
                        value={formData.rating}
                        onChange={handleInputChange}
                    />
                    <input
                        className='InputPanel'
                        type='number'
                        placeholder='Hours Played'
                        name='hours'
                        value={formData.hours}
                        onChange={handleInputChange}
                    />
                    <div className='AllButtons'>
                        <Button className='ButtonPanel' type='button' onClick={onCancel}>Cancel</Button>
                        <Button className='ButtonPanel' type='submit'>Edit Game</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PanelEditGame
