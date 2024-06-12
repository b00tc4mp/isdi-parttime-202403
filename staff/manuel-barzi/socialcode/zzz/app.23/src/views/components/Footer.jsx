import './Footer.css'

import Button from '../../components/core/Button'

function Footer({ onCreatePostClick }) {
    const handleCreatePostClick = () => onCreatePostClick()

    return <footer class="Footer">
        <Button onClick={handleCreatePostClick}>+</Button>
    </footer>
}

export default Footer