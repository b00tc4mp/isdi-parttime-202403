import React from 'react'
import './index.css'
//components
import View from '../../../components/core/View'
import StagnantWasteItem from './StagnantWasteItem'
//hooks
import useFetchItemsList from '../../../hooks/useFetchItemsList'
//utils
import filterByMonthYear from '../../../utils/filterByMonthYear'


const SummaryStatus = () => {

    //solicitar y renderizamos lista de residuos
    const { list } = useFetchItemsList('dataStoreWaste')

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
        <View>
          <div className='SummaryDiv'>

            <h2 className='title'>Residuos estancados:</h2>
            
            {stagnantList.map(item => (
              <StagnantWasteItem key={item.id} item={item} />
            ))}
          
          </div>
        </View>
      );
    };
    
    export default SummaryStatus