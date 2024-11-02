import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import logic from '../logic';

import useContext from '../useContext';

import { SystemError } from 'com/errors';

import Title from '../components/core/Title/Title';

import Button from '../components/core/Button/Button';

import './CreateAdForm.css';

export function CreateAdForm() {
    const navigate = useNavigate();
    const { alert } = useContext();

    const handleCreateAd = (event) => {
        event.preventDefault();

        const form = event.target;

        const title = form.title.value;
        const description = form.description.value;
        const price = form.price.value;
        const contactInfo = form.contactInfo.value;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const geoLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                try {
                    logic
                        .createAd(
                            title,
                            description,
                            price,
                            contactInfo,
                            geoLocation
                        )
                        .then(() => {
                            navigate('/');
                        })
                        .catch((error) => {
                            if (error instanceof SystemError) {
                                alert(error.message);
                            }
                        });
                } catch (error) {
                    alert(error.message);
                }
            });
        }
    };

    const handleCancelCreateAd = (event) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <>
            <Title className="text-center text-2xl text-black mt-3 mb-1 p-1 underline">
                Create Ad
            </Title>
            <form onSubmit={handleCreateAd} className="CreateAdFormContainer">
                <div className="CreateAdFormField">
                    <label htmlFor="title" className="CreateAdFormLabel">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        className="CreateAdFormInput"
                    />
                </div>

                <div className="CreateAdFormField">
                    <label htmlFor="description" className="CreateAdFormLabel">
                        Description
                    </label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Description"
                        className="CreateAdFormInput"
                    />
                </div>

                <div className="CreateAdFormField">
                    <label htmlFor="price" className="CreateAdFormLabel">
                        Price
                    </label>
                    <input
                        id="price"
                        type="text"
                        placeholder="Price €/Kg"
                        className="CreateAdFormInput"
                    />
                </div>

                <div className="CreateAdFormField">
                    <label htmlFor="contactInfo" className="CreateAdFormLabel">
                        Contact Info
                    </label>
                    <input
                        id="contactInfo"
                        type="text"
                        placeholder="email/phone number"
                        className="CreateAdFormInput"
                    />
                </div>

                <Button type="submit" className="CreateAdFormButton">
                    Create
                </Button>
                <p></p>
                <Button
                    type="button"
                    onClick={handleCancelCreateAd}
                    className="CreateAdFormButton"
                >
                    Cancel
                </Button>
            </form>
        </>
    );
}
