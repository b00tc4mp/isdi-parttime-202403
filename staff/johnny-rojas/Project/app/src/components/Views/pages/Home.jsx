import './Home.css'
import Header from '../core/Header'
import TopBar from '../library/TopBar'


import { useNavigate } from 'react-router-dom'
import RoomList from '../library/RoomList'



function Home() {

  const navigate = useNavigate()

  return <div>
    
    <Header>
      <TopBar/>
    </Header>

    <RoomList></RoomList>


  </div>
}

export default Home