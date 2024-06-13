import React, { useEffect, useContext, useState, useRef } from "react";
import Header from "../Components/Header/Header.jsx";
import PostList from "../Components/PostList/PostList.jsx";
import CreatePostForm from "../Components/CreatePostForm/CreatePostForm.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import styles from "./HomePage.module.css";
import logic from "../logic";
import ViewContext from "../ViewContext.jsx";

function HomePage() {
  const mainRef = useRef(null);
  const { setView } = useContext(ViewContext);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [refreshTimeStamp, setRefreshTimeStamp] = useState(0);

  useEffect(() => {
    if (!logic.isUserLoggedIn()) {
      setView("login");
    }
  }, [setView]);

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
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent} ref={mainRef}>
        <PostList refreshTimeStamp={refreshTimeStamp} />
        {showCreatePostForm && (
          <CreatePostForm
            onPostCreated={handlePostCreated}
            onCancel={handleCancel}
          />
        )}
      </main>
      <Footer onAddPost={handleAddPost} onScroll={scrollToTop} />
    </div>
  );
}

export default HomePage;