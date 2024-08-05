import React from 'react'

const StoredSelect = () => {
  return (
    <div>
        <div className='StoredSelect'>
        <h2 className='StoredTitle'>Mercancia acondicionada en: </h2>
        <button className='GRG' value='GRG' name='stored'>GRG</button>
        <button className='Palet' value='Palet' name='stored'>PALET</button>
        <button className='BigBag' value='BigBag' name='stored'>BIGBAG</button>
        <button className='B200'  value='B200' name='stored'>B200</button>
        <button className='B-200' value='B-200' name='stored'>B-200</button>
        <hr></hr>
        <h2 className='StoredStatus'>Mercancia estancada: </h2>
        </div>
        <hr></hr>
    </div>
  )
}

export default StoredSelect