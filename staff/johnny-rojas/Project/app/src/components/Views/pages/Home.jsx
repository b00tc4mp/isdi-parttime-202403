import './Home.css'
import Header from '../core/Header'
import TopBar from '../library/TopBar'

import RoomList from '../library/RoomList'



function Home() {

  return <div>
    <Header>
      <TopBar/>
    </Header>
    <RoomList></RoomList>
  </div>
}

export default Home