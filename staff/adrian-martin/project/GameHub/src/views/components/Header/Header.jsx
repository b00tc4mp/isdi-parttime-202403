import './Header.css'
import Burger from '../Burger/Burger.jsx'
import ProfileImage from '../ProfileImage/ProfileImage.jsx'

function Header() {
    return (
        <div className='Header-Image-Burger'>
            <header className='Header'>
                <Burger />
                <ProfileImage
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