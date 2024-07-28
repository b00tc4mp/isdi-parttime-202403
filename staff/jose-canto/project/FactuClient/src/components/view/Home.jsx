import { Link } from "react-router-dom"

import Title from "../Title"

export default function Home() {
  return (
    <>
      <Title>Home</Title>

      <Link className="Link" to="/login">
        Login
      </Link>
      <br />
      <Link className="Link" to="/register">
        Register
      </Link>
    </>
  )
}
