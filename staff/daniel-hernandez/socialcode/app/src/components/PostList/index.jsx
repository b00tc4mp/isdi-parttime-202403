import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import logic from "../../logic/index";
import Section from "../atomic/Section.jsx";
import Post from "../atomic/Post/index.jsx";
import ConfirmDialog from "../ConfirmDialog/index.jsx";

function PostList({ refreshTimeStamp }) {
  const [posts, setPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    loadPosts();
  }, [refreshTimeStamp]);

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
        setPostToDelete(null);
      });
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const cancelDelete = () => {
    setPostToDelete(null);
  };

  // TODO: delegate post deletion to post component
  return (
    <>
      <Section className={styles.postList}>
        {posts.map((post) => (
          <Post key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </Section>
      {postToDelete && (
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
