import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import logic from "../../logic/index";
import Section from "../atomic/Section.jsx";
import Post from "../atomic/Post/index.jsx";
import ConfirmDialog from "../ConfirmDialog/index.jsx";

import Container from "../atomic/Container.jsx";
import Text from "../atomic/Text.jsx";
import DisableableButton from "../atomic/DisableableButton.jsx";

// TODO: revise
function PostList({ refreshTimeStamp, mainRef }) {
   const [posts, setPosts] = useState([]);
   const [postToDelete, setPostToDelete] = useState(null);

   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   useEffect(() => {
      setPage(1);
   }, [refreshTimeStamp]);

   useEffect(() => {
      loadPosts(page);
   }, [refreshTimeStamp, page]);

   const loadPosts = async page => {
      // TODO: show feedback in a more user-friendly way
      try {
         const { posts, total } = await logic.getAllPosts(page, 10);

         if (!Array.isArray(posts)) {
            console.error("Expected an array but got: ", posts);
            alert("An error occurred while loading the posts.");
            return;
         }

         setPosts(posts);
         setTotalPages(Math.ceil(total / 10));
      } catch (error) {
         console.error(error.message);
      }
   };

   const handleDelete = postId => {
      setPostToDelete(postId);
   };

   const confirmDelete = async () => {
      try {
         await logic.deletePost(postToDelete);
         setPostToDelete(null);
         await loadPosts(page);
      } catch (error) {
         // TODO: show errors more gracefully
         console.error(error.message);
      }
   };

   const cancelDelete = () => {
      setPostToDelete(null);
   };

   const handleNextPage = () => {
      if (page < totalPages) {
         setPage(p => p + 1);
         mainRef.current.scrollTo({ top: 0, behavior: "auto" });
      }
   };

   const handlePreviousPage = () => {
      if (page > 1) {
         setPage(p => p - 1);
         mainRef.current.scrollTo({ top: 0, behavior: "auto" });
      }
   };

   const handleLiked = async postId => {
      try {
         await logic.likePost(postId);
         await loadPosts(page);
      } catch (error) {
         // TODO: show error more gracefully
         console.error(error.message);
      }
   };

   // TODO: delegate post deletion to post component
   // TODO: move pagination to its own component
   return (
      <>
         <Section className={styles.postList}>
            {posts.map(post => (
               <Post key={post.id} post={post} onDelete={handleDelete} onLiked={handleLiked} />
            ))}
         </Section>
         {postToDelete && (
            <ConfirmDialog
               dialog="Are you sure you want to delete this post?"
               onConfirm={confirmDelete}
               onCancel={cancelDelete}
            />
         )}
         <Container className={styles.pagination}>
            <DisableableButton className={styles.button} onClick={handlePreviousPage} condition={page === 1}>
               ❮
            </DisableableButton>
            <Text className={styles.text}>Page {page}</Text>
            <DisableableButton className={styles.button} onClick={handleNextPage} condition={page === totalPages}>
               ❯
            </DisableableButton>
         </Container>
      </>
   );
}

export default PostList;
