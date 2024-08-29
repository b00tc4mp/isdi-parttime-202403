import Image from '../../../../../components/core/Image/Image'
import Text from '../../../../../components/core/Text/Text'
import './GameUser.css'

function GameUser({ game }) {
    console.log('Game -> render')

    const getRatingClass = (rating) => {
        if (rating === 10) return 'Rating10'
        if (rating >= 8) return 'Rating-high'
        if (rating >= 5) return 'Rating-medium'
        return 'Rating-low'
    }

    return (
        <div>
            <div className='GameUser'>
                <div className='GameUser-image'>
                    <Image className='ImageTagUser' src={game.image} />
                </div>
                <div className='GameUser-description'>
                    <Text className='GameUser-title'>{game.title}</Text>
                    <Text className='GameUser-rating'>
                        <span className={getRatingClass(game.rating)}>
                            {game.rating}
                        </span>
                    </Text>
                    <div className='GameUser-hyi'>
                        <Text className='GameUser-hours'>{game.hours}h</Text>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameUser