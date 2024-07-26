import { Link } from "react-router-dom"
import "./Register.css"

export default function Register() {
  return (
    <>
      <div className="RegisterForm">
        <h3>Register</h3>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="username" id="username" required></input>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="email" id="email" required></input>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="password" id="password" required></input>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" placeholder="confirm password" id="confirmPassword" required></input>

        <button type="submit">Register</button>
      </div>

      <Link to="/login">Login</Link>
    </>
  )
}
