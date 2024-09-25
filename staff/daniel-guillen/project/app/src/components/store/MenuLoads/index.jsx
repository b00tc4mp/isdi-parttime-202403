import { useNavigate } from 'react-router-dom'
// components
import Button from '../../core/Button'

const MenuLoads = () => {
  const navigate = useNavigate()

  return (
    <div className='menuFooterDiv'>
      <ul className='menuFooter'>
        <li>
          <Button 
            className='menuFooter-start' 
            onClick={() => navigate('/Store')}
          >
            🔙
          </Button>
        </li>
        <li>
          <Button 
            className='menuFooter-center' 
            onClick={() => navigate('/Departures')}
          >
            📦
          </Button>
        </li>
        <li>
          <Button 
            className='menuFooter-end' 
            onClick={() => navigate('/Departures/Search')}
          >
            🔎
          </Button>
        </li>
      </ul>
    </div>
  )
}

export default MenuLoads
