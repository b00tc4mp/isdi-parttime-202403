import React, { useEffect, useContext } from "react";
import Header from "../Components/Header/Header.jsx";
import PostList from "../Components/PostList/PostList.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import styles from "./HomePage.module.css";
import logic from "../logic";
import ViewContext from "../ViewContext.jsx";

function HomePage() {
  const { setView } = useContext(ViewContext);

  useEffect(() => {
    if (!logic.isUserLoggedIn()) {
      setView("login");
    }
  }, [setView]);

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
