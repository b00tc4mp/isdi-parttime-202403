import './Header.css'
import Burger from '../Burger/Burger.jsx'
import ProfileImage from '../ProfileImage/ProfileImage.jsx'

import { useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate()

    const handleGoToProfile = () => {
        navigate('/profile')
    }

    return (
        <div className='Header-Image-Burger'>
            <header className='Header'>
                <Burger />
                <ProfileImage
                    onClick={handleGoToProfile}
                    className='Header-Image'
                    size='50px'
                    borderRadius='23px'
                    showRotate={false}
                />
            </header>
        </div>
    )
}

export default Header