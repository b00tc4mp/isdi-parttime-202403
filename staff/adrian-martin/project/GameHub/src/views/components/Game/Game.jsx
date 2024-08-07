import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'

import Image from '../../../components/core/Image/Image'
import Text from '../../../components/core/Text/Text'
import logic from '../../../logic/index'

import './Game.css'

function Game({ game }) {
    console.log('Game -> render')

    // TODO handleDeleteGame

    // TODO handleEditGame

    return <div>
        <div>
            <Image src={game.image} />
            <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
        <div>
            <Text>{game.title}</Text>
            <p>{game.rating}</p>
            <p>{game.hours}</p>
        </div>
    </div>
}

export default Game