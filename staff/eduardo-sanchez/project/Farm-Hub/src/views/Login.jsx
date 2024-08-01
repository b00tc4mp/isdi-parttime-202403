import { useState } from "react"

export const Login = () => {
    const onLoginClick = ({ username, password }) => {
        console.log("Welcome ", `${username} with password ${password}`)
    }


    const handlePassword = (event) => {
        console.log(`Password: -> ${event.target.value}`)
        event.preventDefault()
    }


    const [userName, setUsername] = useState('')

    return <>

        <input
            placeholder="username"
            id="username"
            onChange={(newText) => {
                setUsername(newText.target.value)
            }}
        ></input>
        <input
            placeholder="password"
            onChange={handlePassword}
        ></input>

        <button onClick={() => onLoginClick({ username: userName, password: '' })}>Login</button>
    </>
}

