import React, { useEffect } from "react";
import Header from "../Components/Header/Header.jsx";
import PostList from "../Components/PostList/PostList.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import styles from "./HomePage.module.css";
import logic from "../logic.js";

function HomePage() {
  useEffect(() => {
    if (!logic.isUserLoggedIn()) {
      window.location.href = "../login";
    }
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <PostList />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
