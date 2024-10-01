import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logic from '../logic';
import Title from '../components/core/Title/Title';
import Button from '../components/core/Button/Button';
import useContext from '../useContext';
import './UpdateAdForm.css';

export function UpdateAdForm() {
    const { alert } = useContext();
    const [ad, setAd] = useState({
        _id: '',
        title: '',
        description: '',
        price: '',
        contactInfo: '',
    });

    const navigate = useNavigate();
    const { adId } = useParams();

    useEffect(() => {
        chooseAdtoUpdate();
    }, [adId]);

    const handleUpdateAd = (event) => {
        event.preventDefault();
        const { title, description, price, contactInfo } = ad;

        try {
            logic
                .updateAd(adId, title, description, price, contactInfo)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const chooseAdtoUpdate = () => {
        try {
            logic
                .getAd(adId)
                .then(({ adId, title, description, price, contactInfo }) => {
                    setAd({
                        _id: adId,
                        title,
                        description,
                        price,
                        contactInfo,
                    });
                })
                .catch((error) => {
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAdUpdate = (event) =>
        setAd({ ...ad, [event.target.id]: event.target.value });

    const handleCancelUpdateAd = (event) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <>
            <Title className="text-center text-2xl text-black mt-3 mb-1 p-1 underline">
                Update Ad
            </Title>

            <form onSubmit={handleUpdateAd} className="UpdateAdFormContainer">
                <div className="UpdateAdFormField">
                    <label htmlFor="title" className="UpdateAdFormLabel">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={ad.title}
                        onChange={handleAdUpdate}
                        placeholder="Title"
                        className="UpdateAdFormInput"
                    />
                </div>

                <div className="UpdateAdFormField">
                    <label htmlFor="description" className="UpdateAdFormLabel">
                        Description
                    </label>
                    <input
                        id="description"
                        type="text"
                        value={ad.description}
                        onChange={handleAdUpdate}
                        placeholder="Description"
                        className="UpdateAdFormInput"
                    />
                </div>

                <div className="UpdateAdFormField">
                    <label htmlFor="price" className="UpdateAdFormLabel">
                        Price
                    </label>
                    <input
                        id="price"
                        type="text"
                        value={ad.price}
                        onChange={handleAdUpdate}
                        placeholder="Price €/Kg"
                        className="UpdateAdFormInput"
                    />
                </div>

                <div className="UpdateAdFormField">
                    <label htmlFor="contactInfo" className="UpdateAdFormLabel">
                        Contact Info
                    </label>
                    <input
                        id="contactInfo"
                        type="text"
                        value={ad.contactInfo}
                        onChange={handleAdUpdate}
                        placeholder="email/phone number"
                        className="UpdateAdFormInput"
                    />
                </div>

                <Button type="submit" className="UpdateAdFormButton">
                    Update
                </Button>
                <p></p>
                <Button
                    type="button"
                    onClick={handleCancelUpdateAd}
                    className="UpdateAdFormButton"
                >
                    Cancel
                </Button>
            </form>
        </>
    );
}

////////////////////////////////

/*

import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import logic from '../logic';

import Title from '../components/core/Title/Title';

import Button from '../components/core/Button/Button';

import useContext from '../useContext';

import './UpdateAdForm.css';

export function UpdateAdForm() {
    const { alert } = useContext();

    const [ad, setAd] = useState({
        _id: '',
        title: '',
        description: '',
        price: '',
        contactInfo: '',
    });

    const navigate = useNavigate();

    const { adId } = useParams();

    useEffect(() => {
        chooseAdtoUpdate();
    }, [setAd]);

    const handleUpdateAd = (event) => {
        event.preventDefault();

        const form = event.target;

        const title = ad.title;
        const description = ad.description;
        const price = ad.price;
        const contactInfo = ad.contactInfo;

        try {
            logic
                .updateAd(adId, title, description, price, contactInfo)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    alert(error.message);

                    return;
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const chooseAdtoUpdate = () => {
        logic
            .getAd(adId)
            .then(({ adId, title, description, price, contactInfo }) => {
                setAd({ _id: adId, title, description, price, contactInfo });
            });
    };

    const handleAdUpdate = (event) =>
        setAd({ ...ad, [event.target.id]: event.target.value });

    const handleCancelUpdateAd = (event) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <>
            <Title className="text-center text-2xl text-black mt-3 mb-1 p-1 underline">
                Update Ad
            </Title>

            <form onSubmit={handleUpdateAd} className="UpdateAdFormContainer">
                <div className="UpdateAdFormField">
                    <label htmlFor="title" className="UpdateAdFormLabel">
                        Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={ad.title}
                        onChange={handleAdUpdate}
                        placeholder="Title"
                        className="UpdateAdFormInput"
                    />
                </div>

                <div className="UpdateAdFormField">
                    <label htmlFor="description" className="UpdateAdFormLabel">
                        Description
                    </label>
                    <input
                        id="description"
                        type="text"
                        value={ad.description}
                        onChange={handleAdUpdate}
                        placeholder="Description"
                        className="UpdateAdFormInput"
                    />
                </div>

                <div className="UpdateAdFormField">
                    <label htmlFor="price" className="UpdateAdFormLabel">
                        Price
                    </label>
                    <input
                        id="price"
                        type="text"
                        value={ad.price}
                        onChange={handleAdUpdate}
                        placeholder="Price €/Kg"
                        className="UpdateAdFormInput"
                    />
                </div>

                <div className="UpdateAdFormField">
                    <label htmlFor="contactInfo" className="UpdateAdFormLabel">
                        Contact Info
                    </label>
                    <input
                        id="contactInfo"
                        type="text"
                        value={ad.contactInfo}
                        onChange={handleAdUpdate}
                        placeholder="email/phone number"
                        className="UpdateAdFormInput"
                    />
                </div>

                <Button
                    type={'submit'}
                    onClick={handleUpdateAd}
                    className="UpdateAdFormButton"
                >
                    Update
                </Button>
                <p></p>
                <Button
                    type={'button'}
                    onClick={handleCancelUpdateAd}
                    className="UpdateAdFormButton"
                >
                    Cancel
                </Button>
            </form>
        </>
    );
}
    
*/
