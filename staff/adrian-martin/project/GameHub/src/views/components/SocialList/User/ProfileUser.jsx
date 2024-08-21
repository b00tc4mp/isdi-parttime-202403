import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

import Text from '../../../../components/core/Text/Text'

import './ProfileUser.css'

function ProfileUser({ user }) {
    console.log('ProfileUser -> render')

    return (
        <div >
            <div className='ProfileUser'>
                <img src="/images/Icono1_Blanco.png" alt="User Avatar" className="ProfileUser-image" />
                <div className='ProfileUser-text-Icon'>
                    <Text className='ProfileUser-text'>{user.username}</Text>
                    <FontAwesomeIcon className='ProfileUser-icon' icon={faGamepad} />
                </div>
            </div>
        </div>
    )
}

export default ProfileUser