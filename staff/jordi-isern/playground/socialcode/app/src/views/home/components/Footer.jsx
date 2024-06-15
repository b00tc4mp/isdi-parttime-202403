import './Footer.css'

import Button from '../../../Components/Core/Button'

function Footer({onCreatepostClick}) {
    const handleCreatePostClick = () => onCreatepostClick()

    return < footer className='Footer'>
        <Button onClick={handleCreatePostClick}>+</Button>
    </footer>
}

export default Footer