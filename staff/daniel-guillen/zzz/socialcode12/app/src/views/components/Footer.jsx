import Button from '../../components/core/Button'

//import './Footer.css'

function Footer({ onCreatePostClick, onClickScrollTop }) {
    const handleCreatePostClick = () => onCreatePostClick()
    const scrollTop = () => onClickScrollTop()
    return <footer className="Footer">
        <Button onClick={handleCreatePostClick}>📝</Button>
        <Button onClick={scrollTop}>🔝</Button>
    </footer>
}

export default Footer