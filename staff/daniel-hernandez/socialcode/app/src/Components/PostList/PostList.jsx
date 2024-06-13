import React, { useState, useEffect } from "react";
import styles from "./PostList.module.css";
import logic from "../../logic.js";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog.jsx";

function PostList({ refreshTimeStamp }) {
  const [posts, setPosts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    loadPosts();
  }, [refreshTimeStamp])


  const loadPosts = () => {
    try {
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
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleDelete = (postId) => {
    setShowConfirm(true);
    setPostToDelete(postId);
  };

  const confirmDelete = () => {
    try {
      logic.deletePost(postToDelete, (error) => {
        if (error) {
          console.log(error.message);
          alert(error.message);
          // TODO: show errors more gracefully

          return;
        }

        loadPosts();
        setShowConfirm(false);
        setPostToDelete(null);
      });
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setPostToDelete(null);
  };

  return (
    <>
      <section className={styles.postList}>
        {posts.map((post) => (
          <article key={post.id} className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.author}>{post.author}</p>
            <img
              src={post.image}
              alt={post.title}
              className={styles.postImage}
            />
            <p className={styles.postDescription}>{post.description}</p>
            <time className={styles.postTime}>{post.date}</time>
            {post.author === logic.getUsername() && (
              <button
                className={styles.removePostButton}
                onClick={() => {
                  handleDelete(post.id);
                }}
              >
                Delete
              </button>
            )}
          </article>
        ))}
      </section>
      {showConfirm && (
        <ConfirmDialog
          dialog="Are you sure you want to delete this post?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
}

export default PostList;