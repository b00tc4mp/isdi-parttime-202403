import Button from '../components/core/button/Button'
import logic from '../logic/index'
import { useNavigate } from "react-router-dom"
function Home({ }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        logic.logoutAdmin()

        navigate('/login')
    }
    return <>

        <h1 >Hola!</h1>

        <Button className="LogoutButton" onClick={handleLogout}>Logout</Button>
    </>
}

export default Home