import './Footer.css'
import Button from '../../component/core/Button'


function Footer({ onCreatePostClick }) {
    const handleCreatePostClick = () => onCreatePostClick()

    return <footer className='Footer'>
        <Button onClick={handleCreatePostClick}>+</Button>
    </footer>
}

export default Footer