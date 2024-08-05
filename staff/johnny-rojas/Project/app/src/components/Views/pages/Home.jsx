import './Home.css'
import Header from '../core/Header'
import TopBar from '../library/TopBar'


import { useNavigate } from 'react-router-dom'


function Home() {

  const navigate = useNavigate()

  return <div>
    
    <Header>
      <TopBar></TopBar>
    </Header>


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