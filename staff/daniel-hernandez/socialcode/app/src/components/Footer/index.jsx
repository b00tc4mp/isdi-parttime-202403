import styles from "./index.module.css";
import Container from "../atomic/Container.jsx";
import Button from "../atomic/Button.jsx";

function Footer({ onAddPost, onScroll }) {
   return (
      <Container className={styles.footer}>
         <Button className={styles.createPostButton} onClick={onAddPost}>
            ＋
         </Button>
         <Button className={styles.scrollUpButton} onClick={onScroll}>
            ⇧
         </Button>
      </Container>
   );
}

export default Footer;
