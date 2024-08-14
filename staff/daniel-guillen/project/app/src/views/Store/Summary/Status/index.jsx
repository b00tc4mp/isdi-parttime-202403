import React from 'react'
import useFetchWasteList from '../../../../firebase/stored/useFetchWasteList'
import View from '../../../../components/core/View'
import StagnantWasteItem from './StagnantWasteItem'
import '../index.css'

const SummaryStatus = () => {

    //solicitar y renderizamos lista de residuos
    const { list, setList } = useFetchWasteList()

    // Filtrar los residuos con status 'ESTANCADO'
    const filteredList = list
    .filter(item => item.status === 'ESTANCADO')
    // Ordenar por code
    .sort((a, b) => a.code.localeCompare(b.code))

      return (
        <View>
          <div className='SummaryDiv'>
            <h2>Residuos estancados:</h2>
            {filteredList.map(item => (
              <StagnantWasteItem key={item.id} item={item} />
            ))}
          </div>
        </View>
      );
    };
    
    export default SummaryStatus