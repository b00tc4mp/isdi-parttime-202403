import React, { useState, useRef } from "react";
import Header from "../components/Header/index.jsx";
import PostList from "../components/PostList/index.jsx";
import CreatePostForm from "../components/CreatePostForm/index.jsx";
import Footer from "../components/Footer/index.jsx";
import styles from "./index.module.css";
import Container from "../components/atomic/Container.jsx";
import Main from "../components/atomic/Main.jsx";

function HomePage() {
   const mainRef = useRef(null);
   const [showCreatePostForm, setShowCreatePostForm] = useState(false);
   const [refreshTimeStamp, setRefreshTimeStamp] = useState(0);

   const scrollToTop = () => {
      if (mainRef.current) {
         mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
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
      <Container className={styles.container}>
         <Header />
         <Main className={styles.mainContent} ref={mainRef}>
            <PostList refreshTimeStamp={refreshTimeStamp} mainRef={mainRef} />
            {showCreatePostForm && <CreatePostForm onPostCreated={handlePostCreated} onCancel={handleCancel} />}
         </Main>
         <Footer onAddPost={handleAddPost} onScroll={scrollToTop} />
      </Container>
   );
}

export default HomePage;
