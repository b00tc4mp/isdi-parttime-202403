import styles from "./Footer.module.css";

function Footer({ onAddPost }) {
  return (
    <div className={styles.footer}>
      <button className={styles.createPostButton} onClick={onAddPost}>
        ＋
      </button>
    </div>
  );
}

export default Footer;
