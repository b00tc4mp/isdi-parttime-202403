import { Link } from "react-router-dom"

import "./Login.css"

export default function Login() {
  return (
    <>
      <div className="LoginForm">
        <h3>Login</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="username" id="username" required></input>

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="password" id="password" required></input>

        <button type="submit">Login</button>
      </div>

      <Link to="/register">Register</Link>
    </>
  )
}
