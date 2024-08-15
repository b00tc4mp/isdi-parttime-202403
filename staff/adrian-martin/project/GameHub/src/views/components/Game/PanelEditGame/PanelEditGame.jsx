import Button from '../../../../components/core/Button/Button';
import './PanelEditGame.css';
import logic from '../../../../logic';

function PanelEditGame({ game, onGameEdited, onCancel }) {

    const handleEditGame = event => {
        event.preventDefault();

        const form = event.target;

        const title = form.title.value;
        const image = form.image.value;
        const rating = parseFloat(form.rating.value);
        const hours = parseFloat(form.hours.value);

        const updates = {
            title,
            image,
            rating,
            hours
        };

        try {
            logic.editGame(game.id, updates)
                .then(() => {
                    onGameEdited();
                })
                .catch(error => {
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='Container'>
            <div className='EditGamePanel'>
                <form className='EditGame' onSubmit={handleEditGame}>
                    <input className='InputPanel' type='Text' placeholder='Game Title' name='title' />
                    <input className='InputPanel' type='Text' placeholder='Image URL' name='image' />
                    <input className='InputPanel' type='Number' placeholder='Rating 1-10' name='rating' />
                    <input className='InputPanel' type='Number' placeholder='Hours Played' name='hours' />
                    <div className='AllButtons'>
                        <Button className='ButtonPanel' type='submit'>Edit Game</Button>
                        <Button className='ButtonPanel' type='button' onClick={onCancel}>Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PanelEditGame;