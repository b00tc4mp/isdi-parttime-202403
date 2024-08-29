import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import PanelEditGame from './PanelEditGame/PanelEditGame'
import Button from '../../../components/core/Button/Button'
import Image from '../../../components/core/Image/Image'
import Form from '../../../components/core/Form/Form'
import Text from '../../../components/core/Text/Text'
import Confirm from '../Confirm/Confirm'
import logic from '../../../logic/index'
import './Game.css'

function Game({ game, onGameDeleted, onGameEdited }) {
    console.log('Game -> render')
    const [isEditingGame, setIsEditingGame] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const handleEditingGame = () => {
        setIsEditingGame(!isEditingGame)
    }

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm)
        setIsEditingGame(!isEditingGame)
    }

    const handleDeleteGame = () => {
        setShowConfirmDelete(true)
    }

    const confirmDeleteGame = () => {
        logic.deleteGame(game.id)
            .then(() => {
                onGameDeleted()
                setShowConfirmDelete(false)
            })
            .catch(error => {
                console.error(error)
                alert(error.message)
                setShowConfirmDelete(false)
            })
    }

    const getRatingClass = (rating) => {
        if (rating === 10) return 'Rating10'
        if (rating >= 8) return 'Rating-high'
        if (rating >= 5) return 'Rating-medium'
        return 'Rating-low'
    }

    return (
        <div>
            <div className='GameTag'>
                <div className='GameTag-image'>
                    <Image className='ImageTag' src={game.image} />
                </div>
                <div className='GameTag-description'>
                    <Text className='GameTag-title'>{game.title}</Text>
                    <Text className='GameTag-rating'>
                        <span className={getRatingClass(game.rating)}>
                            {game.rating}
                        </span>
                    </Text>
                    <div className='GameTag-hyi'>
                        {game.author.id === logic.getUserId() && (
                            <FontAwesomeIcon
                                className='GameTag-icon'
                                icon={faEllipsisVertical}
                                onClick={handleEditingGame}
                            />
                        )}
                        <Text className='GameTag-hours'>{game.hours}h</Text>
                    </div>
                </div>
            </div>

            {isEditingGame && (
                <Form onSubmit={handleEditingGame} className='EditDeletePanelContainer'>
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
                </Form>
            )}

            {showEditForm && (
                <PanelEditGame
                    game={game}
                    onGameEdited={() => {
                        toggleEditForm()
                        onGameEdited()
                    }}
                    onCancel={toggleEditForm}
                />
            )}

            {showConfirmDelete && (
                <Confirm
                    setShowConfirmDelete={setShowConfirmDelete}
                    handleDeleteGame={confirmDeleteGame}
                    message={`Do you want to delete "${game.title}"?`}
                />
            )}
        </div>
    )
}

export default Game