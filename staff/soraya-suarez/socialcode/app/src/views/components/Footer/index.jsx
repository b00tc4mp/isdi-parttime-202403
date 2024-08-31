import Button from '../../../components/core/Button'

import './index.css'

function Footer({ onCreatePostClick }) {
    const handleCreatePostClick = () => onCreatePostClick()

    return <footer className="Footer">
        <Button onClick={handleCreatePostClick}>+</Button>
    </footer>
}

export default Footer