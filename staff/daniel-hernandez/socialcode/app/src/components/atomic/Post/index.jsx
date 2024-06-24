import styles from "./index.module.css";
import logic from "../../../logic/index";
import Article from "../Article.jsx";
import Heading from "../Heading.jsx";
import Text from "../Text.jsx";
import Image from "../Image.jsx";
import Time from "../Time.jsx";
import Button from "../Button.jsx";

function Post({ post, onDelete }) {
  return (
    <Article className={styles.post}>
      <Heading level={2} className={styles.postTitle}>
        {post.title}
      </Heading>
      <Text className={styles.author}>{post.author}</Text>
      <Image
        source={post.image}
        alternative={post.title}
        className={styles.postImage}
      />
      <Text className={styles.postDescription}>{post.description}</Text>
      <Time className={styles.postTime}>{post.date}</Time>
      {post.author === logic.getUsername() && (
        <Button
          className={styles.removePostButton}
          onClick={() => onDelete(post.id)}
        >
          Delete
        </Button>
      )}
    </Article>
  );
}

export default Post;
