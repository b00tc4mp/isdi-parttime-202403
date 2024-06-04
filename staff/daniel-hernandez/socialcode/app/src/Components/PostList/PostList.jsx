import React, { useEffect, useState } from "react";
import styles from "./PostList.module.css";
import logic from "../../logic.js";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    logic.getAllPosts((error, response) => {
      if (error) {
        console.error(error);

        // TODO: show feedback in a more user-friendly way
        alert(error.message);

        return;
      }

      const posts = response.posts;

      if (!Array.isArray(posts)) {
        console.error("Expected an array, but got: ", posts);
        alert("An error occurred while loading posts.");
        return;
      }

      setPosts(posts);
    });
  }, []);

  return (
    <section className={styles.postList}>
      {posts.map((post) => (
        <article key={post.id} className={styles.post}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.author}>{post.author}</p>
          <img src={post.image} alt={post.title} className={styles.postImage} />
          <p className={styles.postDescription}>{post.description}</p>
          <time>{post.date}</time>
        </article>
      ))}
    </section>
  );
}

export default PostList;
