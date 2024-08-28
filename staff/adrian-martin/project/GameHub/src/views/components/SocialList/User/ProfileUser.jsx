import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router-dom'

import Text from '../../../../components/core/Text/Text'
import Image from '../../../../components/core/Image/Image'

import './ProfileUser.css'

function ProfileUser({ user }) {
    console.log('ProfileUser -> render')

    const navigate = useNavigate()

    const handleGoToTargetProfile = () => {
        navigate(`/profile/${user.id}`)
    }

    return (
        <div >
            <div onClick={handleGoToTargetProfile} className='ProfileUser'>
                <Image src="/images/Icono1_Blanco.png" alt="User Avatar" className="ProfileUser-image" />
                <div className='ProfileUser-text-Icon'>
                    <Text className='ProfileUser-text'>{user.username}</Text>
                    <FontAwesomeIcon className='ProfileUser-icon' icon={faGamepad} />
                </div>
            </div>
        </div>
    )
}

export default ProfileUser