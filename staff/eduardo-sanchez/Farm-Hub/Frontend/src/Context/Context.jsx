import { createContext, useContext, useState } from "react";

import logic from "../logic";

// @ts-ignore
export const Context = createContext()

export const AdsProvider = ({ children }) => {

    const fetchUserInfo = (setUser) => {
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

    const loadAds = (setAds, setIsLoading) => {
        console.log('I got here')
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

    const loadFilteredAds = (setAds, setIsLoading, search) => {
        console.log('texto', search)
        try {

            logic
                .searchAds(search)
                .then((searchedAds) => {
                    setAds(searchedAds);
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

    return (

        <Context.Provider value={{ fetchUserInfo, loadAds, loadFilteredAds }}>{children}</Context.Provider>
    )

}



