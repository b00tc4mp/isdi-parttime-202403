import { useNavigate } from 'react-router-dom'
// components
import Button from '../../components/core/Button'
// img
import stored from '../../components/img/stored.jpg'
import summary from '../../components/img/summary.jpg'
import loads from '../../components/img/loads.jpg'
import departures from '../../components/img/departures.jpg'

const Store = () => {
  const navigate = useNavigate()

  return (
    <div className='home'>
<Button onClick={() => navigate('/Store/Stored')}>
  <img className='image' src={stored} alt="Stored" />
</Button>

<Button onClick={() => navigate('/Store/Summary')}>
  <img className='image' src={summary} alt="Summary" />
</Button>

<Button onClick={() => navigate('/Departures')}>
  <img className='image' src={loads} alt="Loads" />
</Button>

<Button onClick={() => navigate('/Departures/Search')}>
  <img className='image' src={departures} alt="Departures" />
</Button>
    </div>
  )
}

export default Store