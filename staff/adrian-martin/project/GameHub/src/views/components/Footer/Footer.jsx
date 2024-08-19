import './Footer.css'
import Button from '../../../components/core/Button/Button'


function Footer({ onCreateGame }) {
    // const handleCreateGame = () => onCreateGame()

    return <footer className='Footer'>
        <Button onClick={onCreateGame}>⊕</Button>
    </footer>
}

export default Footer