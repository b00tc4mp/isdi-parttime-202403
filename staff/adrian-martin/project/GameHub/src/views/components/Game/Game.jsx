import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PanelEditGame from './PanelEditGame/PanelEditGame';
import Button from '../../../components/core/Button/Button';
import Image from '../../../components/core/Image/Image';
import Text from '../../../components/core/Text/Text';
import logic from '../../../logic/index';
import './Game.css';

function Game({ game, onGameDeleted }) {
    console.log('Game -> render');
    const [isEditingGame, setIsEditingGame] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleEditingGame = () => {
        setIsEditingGame(!isEditingGame);
    };

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
        setIsEditingGame(!isEditingGame);
    };

    const handleDeleteGame = () => {
        try {
            logic.deleteGame(game.id)
                .then(() => onGameDeleted())
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div>
            <div className='GameTag'>
                <div className='GameTag-image'>
                    <Image className='ImageTag' src={game.image} />
                </div>
                <div className='GameTag-description'>
                    <Text className='GameTag-title'>{game.title}</Text>
                    <p className='GameTag-rating'>{game.rating}</p>
                    <div className='GameTag-hyi'>
                        {game.author.id === logic.getUserId() && (
                            <FontAwesomeIcon
                                className='GameTag-icon'
                                icon={faEllipsisVertical}
                                onClick={handleEditingGame}
                            />
                        )}
                        <p className='GameTag-hours'>{game.hours}h</p>
                    </div>
                </div>
            </div>

            {isEditingGame && (
                <form onSubmit={handleEditingGame} className='EditDeletePanelContainer'>
                    <div className='EditDeletePanel'>
                        <Button
                            className='Button-3point'
                            onClick={toggleEditForm}
                        >Edit</Button>

                        <span>|</span>

                        <Button
                            className='Button-3point'
                            onClick={handleDeleteGame}
                        >Delete</Button>
                    </div>
                </form>
            )}

            {showEditForm && (
                <PanelEditGame
                    game={game}
                    onGameEdited={toggleEditForm}
                    onCancel={toggleEditForm}
                />
            )}
        </div>
    );
}

export default Game;