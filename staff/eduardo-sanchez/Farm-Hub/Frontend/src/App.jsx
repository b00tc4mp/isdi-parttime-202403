import { useState } from 'react';
import logic from './logic';

import './global.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import { Context } from './useContext';

import Alert from './views/components/Alert/Alert';

import Register from './views/Register';
import Home from './views/Home';
import { Notfound } from './views/Notfound';
import { Login } from './views/Login';

import { CreateAdForm } from './views/components/CreateAdForm/CreateAdForm';
import AdPage from './views/AdPage';
import { UpdateAdForm } from './views/UpdateAdForm';
import { MyAccount } from './views/MyAccount';
import { MyAds } from './views/MyAds';
import { MyComments } from './views/MyComments';

function App() {
    console.log('App -> render');

    const [message, setMessage] = useState(null);

    const handleAlertAccept = () => setMessage(null);

    const handleMessage = (message) => setMessage(message);

    return (
        <>
            <Context.Provider value={{ alert: handleMessage }}>
                <Routes>
                    <Route
                        path="/register"
                        element={
                            logic.isUserLoggedIn() ? (
                                <Navigate to="/" />
                            ) : (
                                <Register />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            logic.isUserLoggedIn() ? (
                                <Navigate to="/" />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/"
                        element={
                            logic.isUserLoggedIn() ? (
                                <Home />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="/*" element={<Notfound />} />

                    <Route path="/createad" element={<CreateAdForm />}></Route>
                    <Route path="/adpage/:adId" element={<AdPage />}></Route>
                    <Route
                        path="updateadform/:adId"
                        element={<UpdateAdForm />}
                    ></Route>

                    <Route path="/myaccount" element={<MyAccount />}></Route>

                    <Route path="/myads" element={<MyAds />}></Route>

                    <Route path="/mycomments" element={<MyComments />}></Route>
                </Routes>
                {message && (
                    <Alert message={message} onAccept={handleAlertAccept} />
                )}
            </Context.Provider>
        </>
    );
}

export default App;
