import './Footer.css'

import Button from '../../components/core/Button'

function Footer({ onCreatePostClick }) {
    const handleCreatePostClick = () => onCreatePostClick()

    return <footer className='Footer'>
        <Button className='ButtonFooter' onClick={handleCreatePostClick}>+</Button>
    </footer>
}

export default Footer