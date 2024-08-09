import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import Image from '../../../components/core/Image/Image'
import Text from '../../../components/core/Text/Text'
import logic from '../../../logic/index'

import './Game.css'

function Game({ game }) {
    console.log('Game -> render')

    // TODO handleDeleteGame

    // TODO handleEditGame

    return <div>
        <div className='GameTag'>
            <div className='GameTag-image'>
                <Image className='ImageTag' src={game.image} />
                {game.author.id === logic.getUserId() && <FontAwesomeIcon className='GameTag-icon' icon={faEllipsisVertical} />}
            </div>
            <div className='GameTag-description'>
                <Text className='GameTag-title'>{game.title}</Text>
                <p className='GameTag-rating'>{game.rating}</p>
                <p className='GameTag-hours'>{game.hours}h</p>
            </div>
        </div>
    </div>
}

export default Game