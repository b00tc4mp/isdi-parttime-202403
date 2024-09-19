import './index.css'
//components
import SummaryStored from './SummaryStored'
import SummaryStatus from './SummaryStatus'
import MenuStore from '../../components/MenuStore'

const SummaryStore = () => {

  return (

    <div className='SummaryStoreDiv'>
    
    <h1 className='RouteTitle'>RESUMEN</h1>

      <SummaryStored />
      <SummaryStatus />
      <MenuStore />
      
    </div>

  );
};

export default SummaryStore;