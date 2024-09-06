import './index.css'
//components
import Register from './Register'
import WasteStored from './DataStore'
import MenuStore from '../../components/MenuStore'

const Stored = () => {

  return (
    <div className='container'>
        <Register />
        <WasteStored />
        <MenuStore />
    </div>
  )
}

export default Stored