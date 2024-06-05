import styles from "./Footer.module.css";

function Footer({ onAddPost, onScroll }) {
  return (
    <div className={styles.footer}>
      <button className={styles.createPostButton} onClick={onAddPost}>
        ＋
      </button>
      <button className={styles.scrollUpButton} onClick={onScroll}>
        ⇧
      </button>
    </div>
  );
}

export default Footer;
