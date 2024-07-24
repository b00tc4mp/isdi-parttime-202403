import { useState, useRef } from 'react';
import './index.css';
import Header from '../components/Header';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';
import Footer from '../components/Footer';
import Container from '../components/atomic/Container';
import Main from '../components/atomic/Main';

function HomePage() {
   const mainRef = useRef(null);
   const [showCreatePostForm, setShowCreatePostForm] = useState(false);
   const [refreshTimeStamp, setRefreshTimeStamp] = useState(0);

   const scrollToTop = () => {
      if (mainRef.current) {
         mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   const handlePostCreated = () => {
      setShowCreatePostForm(false);
      setRefreshTimeStamp(Date.now());
      scrollToTop();
   };

   const handleCancel = () => {
      setShowCreatePostForm(false);
   };

   const handleAddPost = () => {
      setShowCreatePostForm(true);
   };

   return (
      <Container className="container">
         <Header />
         <Main className="mainContent" ref={mainRef}>
            <PostList refreshTimeStamp={refreshTimeStamp} mainRef={mainRef} />
            {showCreatePostForm && <CreatePostForm onPostCreated={handlePostCreated} onCancel={handleCancel} />}
         </Main>
         <Footer onAddPost={handleAddPost} onScroll={scrollToTop} />
      </Container>
   );
}

export default HomePage;
