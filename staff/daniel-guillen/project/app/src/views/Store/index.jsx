//img
import stored from '../../components/img/stored.jpg'
import summary from '../../components/img/summary.jpg'
import loads from '../../components/img/loads.jpg'
import departures from '../../components/img/departures.jpg'

const Store = () => {
  return (

    <div className='container'>
      
      <a href="/Store/Stored"><img className='image' src={stored} /> </a>
      
      <a href="/Store/Summary"><img className='image' src={summary} /> </a>

      <a href="/Departures"><img className='image' src={loads} /> </a>
      
      <a href="/Departures/Search"><img className='image' src={departures} /> </a>
    
    </div>

  )
}

export default Store