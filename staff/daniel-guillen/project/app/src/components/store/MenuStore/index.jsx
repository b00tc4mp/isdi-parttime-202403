import { useNavigate } from 'react-router-dom'
// components
import Button from '../../core/Button'

const MenuStore = () => {
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
            onClick={() => navigate('/Store/Stored')}
          >
            📦
          </Button>
        </li>
        <li>
          <Button 
            className='menuFooter-center' 
            onClick={() => navigate('/Store/Summary')}
          >
            📊
          </Button>
        </li>
        <li>
          <Button 
            className='menuFooter-end' 
            onClick={() => navigate('/Store/Search')}
          >
            🔎
          </Button>
        </li>
      </ul>
    </div>
  )
}

export default MenuStore
