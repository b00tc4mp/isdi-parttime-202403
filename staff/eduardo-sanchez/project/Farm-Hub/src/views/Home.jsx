import { Link } from "react-router-dom"
import Title from "../components/core/Title"

function Home() {
    return <>

        <Title>Farm-Hub</Title>
        <Link className="Link" to="/register">Register</Link>
        <p></p>
        <Link className="Link" to="/login">Login</Link>


    </>
}


export default Home