import './Footer.css'
import Button from '../../../components/core/Button/Button'


function Footer({ className, onCreateGame }) {
    // const handleCreateGame = () => onCreateGame()

    return <footer className={className}>
        <Button onClick={onCreateGame}>⊕</Button>
    </footer>
}

export default Footer