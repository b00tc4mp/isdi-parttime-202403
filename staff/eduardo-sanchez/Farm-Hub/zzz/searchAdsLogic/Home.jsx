import { useEffect, useState } from "react";
import logic from "../logic";
import searchAds from "../logic/searchAds"; // Import the searchAds function
import AdList from "./components/AdList/AdList";
import SearchBox from "./components/SearchBox/SearchBox";
import { CreateAdButton } from "./components/CreateAdButton/CreateAdButton";
import Header from "./components/Header/Header";
import "./Home.css";

function Home() {
    const [user, setUser] = useState("");
    const [ads, setAds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);

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
        setIsLoading(true);
        try {
            logic
                .getAllAds()
                .then((fetchedAds) => {
                    console.log(fetchedAds);
                    setAds(fetchedAds);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    alert(error.message);
                    setIsLoading(false);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
            setIsLoading(false);
        }
    };

    const handleSearch = (searchText) => {
        if (searchText.trim() === "") {
            loadAds();
            setIsSearchActive(false);
        } else {
            setIsLoading(true);
            setIsSearchActive(true);
            searchAds(searchText)
                .then((searchedAds) => {
                    setAds(searchedAds);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    alert(error.message);
                    setIsLoading(false);
                });
        }
    };

    const handleClearSearch = () => {
        loadAds();
        setIsSearchActive(false);
    };

    const handleAdDeleted = () => loadAds();

    return (
        <>
            <Header user={user} />
            <div className="HomeContainer">
                <main className="Home">
                    <SearchBox onSearch={handleSearch} />
                    {isSearchActive && (
                        <button onClick={handleClearSearch} className="ClearSearchButton">
                            Back to All Ads
                        </button>
                    )}
                    <div>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <AdList ads={ads} onAdDeleted={handleAdDeleted} />
                        )}
                    </div>
                </main>
                <CreateAdButton />
            </div>
        </>
    );
}

export default Home;