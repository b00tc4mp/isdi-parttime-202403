import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SystemError } from 'com/errors';
import Title from '../components/core/Title/Title';
import logic from '../logic';
import useContext from '../useContext';

import backArrow from '../icons/backArrow.png';
import './MyAccount.css';

export const MyAccount = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const { alert } = useContext();

    useEffect(() => {
        console.log('MyAccount -> useEffect');
        loadUserInfo();
    }, []);

    const loadUserInfo = () => {
        try {
            logic
                .getUserInfo()
                .then(setUserInfo)
                .catch((error) => {
                    if (error instanceof SystemError) {
                        console.log(error.message);
                        alert(error.message);
                    }
                });
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    return (
        <>
            <Title className="text-center text-2xl text-black mt-3 mb-1 p-1 underline">
                My Account
            </Title>

            <img
                className="absolute left-3 top-3 w-11 bg-transparent cursor-pointer text-black font-bold"
                src={backArrow}
                alt="Go back"
                onClick={() => navigate(-1)}
            />

            {userInfo && (
                <div className="MyAccountContainer">
                    <div className="MyAccountField">
                        <span className="MyAccountLabel">Name</span>
                        <span className="MyAccountValue">{userInfo.name}</span>
                    </div>
                    <div className="MyAccountField">
                        <span className="MyAccountLabel">Surname</span>
                        <span className="MyAccountValue">
                            {userInfo.surname}
                        </span>
                    </div>
                    <div className="MyAccountField">
                        <span className="MyAccountLabel">Email</span>
                        <span className="MyAccountValue">{userInfo.email}</span>
                    </div>
                    <div className="MyAccountField">
                        <span className="MyAccountLabel">Username</span>
                        <span className="MyAccountValue">
                            {userInfo.username}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};
