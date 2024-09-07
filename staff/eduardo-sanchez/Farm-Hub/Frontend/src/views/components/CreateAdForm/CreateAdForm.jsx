import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import logic from '../../../logic'

import { SystemError } from 'com/errors'

import Button from '../../../components/core/Button'

export function CreateAdForm() {

    const navigate = useNavigate()

    const handleCreateAd = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const description = form.description.value
        const price = form.price.value

        console.log({ title, description, price })

        try {

            logic.createAd(title, description, price)
                .then(() => {
                    navigate("/")
                    console.log('Ad created')

                })
                .catch(error => {
                    if (error instanceof SystemError) {

                        console.error(error)
                        alert(error.message)
                    }
                })
        } catch (error) {
            console.error(error.message)

            alert(error.message)
        }
    }

    const handleCancelCreateAd = event => {
        event.preventDefault()
        navigate("/")
    }

    return <>

        <h1>CreateAdForm</h1>
        <form onSubmit={handleCreateAd} >
            <input id="title" type="text" placeholder="Title" />
            <input id="description" type="text" placeholder="Description" />
            <input id="price" type="text" placeholder="Price" />
            <p></p>
            <Button type="submit">Create</Button>
            <p></p>
            <Button onClick={handleCancelCreateAd}>Cancel</Button>
        </form>
    </>
}