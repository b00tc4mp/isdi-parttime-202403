export const Login = () => {
    const onLoginClick = ({ username, password }) => {
        console.log("Welcome ", `${username} with password ${password}`)
    }

    const handleUsername = (event) => {
        console.log(`Username: -> ${event.target.value}`)
        event.preventDefault()
    }

    const handlePassword = (event) => {
        console.log(`Password: -> ${event.target.value}`)
        event.preventDefault()
    }

    return <>
        <input placeholder="username" onChange={handleUsername} id="username"></input>
        <input placeholder="password" onChange={handlePassword} ></input>
        <button onClick={() => onLoginClick({ username: '', password: '' })}>Login</button>
    </>
}

