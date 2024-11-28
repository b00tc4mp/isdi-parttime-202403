import './index.css';
import Container from '../atomic/Container';
import Button from '../atomic/Button';

function Footer({ onAddPost, onScroll }) {
   return (
      <Container className="footer">
         <Button className="createPostButton" onClick={onAddPost}>
            ＋
         </Button>
         <Button className="scrollUpButton" onClick={onScroll}>
            ⇧
         </Button>
      </Container>
   );
}

export default Footer;
