import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Title from "../components/core/Title";
import Button from "../components/core/Button";

import logic from "../logic";

import AdList from "./components/AdList/AdList";
import SearchBox from "./components/SearchBox/SearchBox";

import './Home.css';
import Header from "./components/Header/Header";
import { CreateAdButton } from "./components/CreateAdButton/CreateAdButton";

function Home() {
    const [ads, setAds] = useState([]);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Home -> useEffect');

        try {
            logic.getUserInfo()
                .then(user => {
                    console.log('Home -> setUser');
                    setUser(user);
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }, []);

    const handleSearch = (search) => {
        try {
            logic.searchAds(search)
                .then(ads => {
                    setAds(ads);
                })
                .catch((error) => {
                    alert(error.message);
                });

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <Header user={user} onSearch={handleSearch} />

            <main className="Home">
                <CreateAdButton />

                <div>
                    <AdList ads={ads} setAds={setAds} />
                </div>
            </main>
        </>
    );
}

export default Home;
