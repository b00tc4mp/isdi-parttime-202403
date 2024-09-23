import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import logic from '../logic';

import Button from '../components/core/Button/Button';

export function UpdateAdForm() {
    const [message, setMessage] = useState('');

    const [ad, setAd] = useState({
        _id: '',
        title: '',
        description: '',
        price: '',
    });

    const navigate = useNavigate();

    const { adId } = useParams();

    useEffect(() => {
        console.log('UpdateAdForm -> useEffect');
        chooseAdtoUpdate();
    }, [setAd]);

    const handleUpdateAd = (event) => {
        event.preventDefault();

        const form = event.target;

        const title = ad.title;
        const description = ad.description;
        const price = ad.price;

        console.log({ title, description, price });

        try {
            logic
                .updateAd(adId, title, description, price)
                .then(() => {
                    navigate('/');
                    console.log('Ad updated');
                })
                .catch((error) => {
                    console.error(error);
                    alert(error.message);

                    setMessage(error.message);
                    return;
                });
        } catch (error) {
            console.error(error.message);
            alert(error.message);

            setMessage(error.message);
        }
    };

    const chooseAdtoUpdate = () => {
        logic.getAd(adId).then(({ adId, title, description, price }) => {
            // console.log(ad)
            setAd({ _id: adId, title, description, price });
            console.log({ title, description, price });
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
            <h1>UpdateAdForm</h1>
            <form onSubmit={handleUpdateAd}>
                <p>{message}</p>
                <input
                    id="title"
                    type="text"
                    value={ad.title}
                    onChange={handleAdUpdate}
                    placeholder="Title"
                />
                <input
                    id="description"
                    type="text"
                    value={ad.description}
                    onChange={handleAdUpdate}
                    placeholder="Description"
                />
                <input
                    id="price"
                    type="text"
                    value={ad.price}
                    onChange={handleAdUpdate}
                    placeholder="Price"
                />
                <p></p>
                <Button onClick={handleUpdateAd}>Update</Button>
                <p></p>
                <Button onClick={handleCancelUpdateAd}>Cancel</Button>
            </form>
        </>
    );
}
