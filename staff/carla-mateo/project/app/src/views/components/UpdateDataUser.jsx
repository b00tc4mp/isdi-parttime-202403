import { useState } from "react"

import Button from "../../components/core/Button"

import logic from "../../logic"
import Field from "../../components/core/Field"

function updateDataUser({ userId, onSuccessEdit }) {

    const [message, setMessage] = useState("")

    const handleUpdateDataUserSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const email = form.email.value
        const avatar = form.avatar.value

        try {
            logic.updateDataUser(userId, username, email, avatar)
                .then(() => onSuccessEdit())
                .catch(error => {
                    console.error(error.message)

                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error.message)

            setMessage(error.message)
        }
    }


    return (
        <>
            <div className="fixed bottom-0 mb-20 left-1/2 transform -translate-x-1/2 bg-color-footer p-4 rounded-lg shadow-lg">
                <form className="mb-4" onSubmit={handleUpdateDataUserSubmit}>
                    <Field id="username" type="text" placeholder="New username" />
                    <Field id="email" type="email" placeholder="New email" />
                    <label htmlFor="avatar">Select an avatar:</label>
                    <select id="avatar" name="avatar" className="right-0 mt-2 m-4 w-30 bg-green-100 border border-green-800 shadow-lg">
                        <option value="avatars/azul.png">azul</option>
                        <option value="avatars/rojo.png">rojo</option>
                        <option value="avatars/amarillo.png">amarillo</option>
                        <option value="avatars/naranja.png">naranja</option>
                        <option value="avatars/morado.png">morado</option>
                        <option value="avatars/verde.png">verde</option>
                    </select>
                    <Button className="flex justify-between" type="submit">Edit profil</Button>
                </form >
            </div>
        </>
    )
}

export default updateDataUser