import React from 'react'
import './index.css'
//components
import StagnantWasteItem from './StagnantWasteItem'
//hooks
import useFetchList from '../../../hooks/useFetchList'
//utils
import filterByMonthYear from '../../../utils/filterByMonthYear'


const SummaryStatus = () => {

    //solicitar y renderizamos lista de residuos
    const { list } = useFetchList('dataStoreWaste')

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())
  
    // Filtramos los residuos por mes y año
    const filteredList = filterByMonthYear(list, month, year)

    // Filtramos los residuos con status 'ESTANCADO' y ordenamos por codigo
    const stagnantList = filteredList
    .filter(item => item.status === 'ESTANCADO')
    .sort((a, b) => a.code.localeCompare(b.code))

      return (

          <div className='SummaryDiv'>

            <h2 className='title'>Residuos estancados:</h2>
            
            {stagnantList.map(item => (
              <StagnantWasteItem key={item.id} item={item} />
            ))}
          
          </div>

      );
    };
    
    export default SummaryStatus