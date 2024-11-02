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
  const [adsFiltered, setAdsFiltered] = useState(ads);

  useEffect(() => {
    console.log("Home -> useEffect");

    fetchUserInfo();
    loadAds();
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

          alert(error.message + " " + "HELL");
        });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };


  const loadAds = () => {
    try {
      logic
        .getAllAds()
        .then((fetchedAds) => {
          console.log(fetchedAds);
          setAds(fetchedAds);
          setAdsFiltered(fetchedAds);
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


  const filterdAds = (searchText) => {
    const adsFiltered = ads.filter((ad) => {
      return ad.title.toLowerCase().includes(searchText.toLowerCase());
    });
    setAdsFiltered(adsFiltered);
  };

  const handleAdDeleted = () => loadAds();

  return (
    <>
      <Header user={user} />
      <div className="HomeContainer">


        <main className="Home">
          <SearchBox filterdAds={filterdAds} />

          <div>
            <AdList
              // setAds={setAds}
              adsFiltered={adsFiltered}
              // setAdsFiltered={setAdsFiltered}
              onAdDeleted={handleAdDeleted}
            />
          </div>
        </main>
        <CreateAdButton />
      </div>
    </>
  );
}

export default Home;
