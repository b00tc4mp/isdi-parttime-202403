import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logic from "../logic";
import AdList from "./components/AdList/AdList";
import SearchBox from "./components/SearchBox/SearchBox";
import { CreateAdButton } from "./components/CreateAdButton/CreateAdButton";


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
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState(""); // state for searching text

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
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const loadAds = () => {
        //setIsLoading(true);
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

    const handleSearch = (search) => {
        //setIsLoading(true);
        console.log('texto', search)
        try {
            if (search.length > 0) {
                logic
                    .searchAds(search)
                    .then((searchedAds) => {
                        setAds(searchedAds);
                        // setSearchText('');
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error.message);
                        setIsLoading(false);
                    });
            } else {
                console.log("Home -> loadAds");
                loadAds();
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
            setIsLoading(false);
        }
    };

    const handleAdDeleted = () => loadAds();

    return (
        <>
            <Header user={user} />
            <div className="HomeContainer">
                <main className="Home">
                    <SearchBox searchText={searchText}
                        setSearchText={setSearchText} onSearch={handleSearch} />
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <AdList ads={ads} onAdDeleted={handleAdDeleted} />
                    )}
                </main>
                <CreateAdButton />
            </div>
        </>
    );
}