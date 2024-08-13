import Button from '../../../../components/core/Button/Button'
import './PanelEditGame.css'

import logic from '../../../../logic'

function PanelEditGame() {

    const handleEditGame = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const image = form.image.value
        const rating = parseFloat(form.rating.value)
        const hours = parseFloat(form.hours.value)

        const updates = {
            title,
            image,
            rating,
            hours
        }

        try {
            logic.editGame(userId, updates)
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
        <form className='EditGame' onSubmit={handleEditGame}>
            <input type='text' placeholder='Game Title' name='title' />
            <input type='text' placeholder='Image URL' name='image' />
            <input type='number' placeholder='Rating (1-10)' name='rating' />
            <input type='number' placeholder='Hours Played' name='hours' />

            <Button type='submit'>Edit Game</Button>
        </form>
    )
}

export default PanelEditGame