import { useState, useEffect } from 'react';
import './index.css';
import logic from '../../logic';
import Section from '../atomic/Section';
import Post from '../atomic/Post';
import ConfirmDialog from '../ConfirmDialog';
import Container from '../atomic/Container';
import Text from '../atomic/Text';
import DisableableButton from '../atomic/DisableableButton';

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
            console.error('Expected an array but got: ', posts);
            alert('An error occurred while loading the posts.');
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
         mainRef.current.scrollTo({ top: 0, behavior: 'auto' });
      }
   };

   const handlePreviousPage = () => {
      if (page > 1) {
         setPage(p => p - 1);
         mainRef.current.scrollTo({ top: 0, behavior: 'auto' });
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
         <Section className="postList">
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
         <Container className="pagination">
            <DisableableButton className="button" onClick={handlePreviousPage} condition={page === 1}>
               ❮
            </DisableableButton>
            <Text className="text">Page {page}</Text>
            <DisableableButton className="button" onClick={handleNextPage} condition={page === totalPages}>
               ❯
            </DisableableButton>
         </Container>
      </>
   );
}

export default PostList;
