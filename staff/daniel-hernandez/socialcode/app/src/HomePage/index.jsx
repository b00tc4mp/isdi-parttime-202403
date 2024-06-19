import React, { useState, useRef } from "react";
import Header from "../Components/Header/index.jsx";
import PostList from "../Components/PostList/index.jsx";
import CreatePostForm from "../Components/CreatePostForm/index.jsx";
import Footer from "../Components/Footer/index.jsx";
import styles from "./index.module.css";
import Container from "../Components/Atomic/Container.jsx";
import Main from "../Components/Atomic/Main.jsx";

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
        <PostList refreshTimeStamp={refreshTimeStamp} />
        {showCreatePostForm && (
          <CreatePostForm
            onPostCreated={handlePostCreated}
            onCancel={handleCancel}
          />
        )}
      </Main>
      <Footer onAddPost={handleAddPost} onScroll={scrollToTop} />
    </Container>
  );
}

export default HomePage;
