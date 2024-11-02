import { useNavigate } from 'react-router-dom'
import { Button } from '../../core'

const MenuLoads = () => {
  const navigate = useNavigate()

  return (
    <div className='menuFooterDiv'>
      <ul className='menuFooter'>
        <li>
          <Button className='menuFooter-start' onClick={() => navigate('/Store')} > 🔙 </Button>
        </li>
        <li>
          <Button className='menuFooter-center' onClick={() => navigate('/Departures/registerload')} > 📦 </Button>
        </li>
        <li>
          <Button className='menuFooter-end' onClick={() => navigate('/Departures/searchdepartures')} > 🔎 </Button>
        </li>
      </ul>
    </div>
  )
}

export default MenuLoads
