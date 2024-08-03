import './Home.css'

import logic from '../../../logic/index'
import { useNavigate } from 'react-router-dom'

function Home({ onUserLoggedOut }) {

  const navigate = useNavigate()

  const handleLogout = () => {
    logic.logoutUser()

    navigate('/')
  }

  return <div>

    <h3>HELLO</h3>

    <button className="LogoutButton" onClick={handleLogout}>Logout</button>


  </div>

  // return <div>
  //   <principalbar></principalbar>
  //   <section>
  //     <img></img>
  //     <img></img>
  //     <img></img>
  //     <img></img>
  //   </section>
  //   <div>
  //     <card></card>
  //     <card></card>
  //     <card></card>
  //     <card></card>
  //     <card></card>
  //     <card></card>
  //     <card></card>
  //     <card></card>
  //   </div>
  // </div>
}

export default Home