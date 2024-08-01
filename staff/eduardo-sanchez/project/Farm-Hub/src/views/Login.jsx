import { useState } from "react"

export const Login = () => {
    const onLoginClick = ({ username, password }) => {
        console.log("Welcome ", `${username} with password ${password}`)
    }

    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
            id="password"
            onChange={(newText) => {
                setPassword(newText.target.value)
            }}
        ></input>

        <button onClick={() => onLoginClick({ username: userName, password: password })}>Login</button>
    </>
}

