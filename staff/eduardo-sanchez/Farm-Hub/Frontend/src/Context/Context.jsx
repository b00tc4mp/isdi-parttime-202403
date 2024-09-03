import { createContext, useContext, useState } from "react";

import logic from "../logic";

const Context = createContext()

const AdsContext = ({ children }) => {

    const [ads, setAds] = useState([])


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

    return (

        <Context.Provider value={{ ads, setAds }}>{children}</Context.Provider>
    )

}