import { useEffect, useState } from "react";
import logic from "../logic";
import AdList from "./components/AdList/AdList";
import SearchBox from "./components/SearchBox/SearchBox";
import { CreateAdButton } from "./components/CreateAdButton/CreateAdButton";
import Header from "./components/Header/Header";
import "./Home.css";

function Home() {
  const [user, setUser] = useState("");
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState(""); // state for searching text

  useEffect(() => {
    console.log("Home -> useEffect");
    fetchUserInfo();
    // loadAds();
  }, []);

  const fetchUserInfo = () => {
    try {
      logic
        .getUserInfo()
        .then((user) => {
          console.log("Home -> setUsername");
          setUser(user);
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };


  return (
    <>
      <Header user={user} />
      <div className="HomeContainer">
        <main className="Home">
          <SearchBox searchText={searchText}
            setSearchText={setSearchText} setAds={setAds} setIsLoading={setIsLoading} />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <AdList ads={ads} setAds={setAds} />
          )}
        </main>
        <CreateAdButton />
      </div>
    </>
  );
}

export default Home;