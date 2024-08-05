import React, { useState } from 'react'
import './index.css'
import WasteSelect from './WasteSelect'
import StoredSelect from './StoredSelect'
import ButtonStagnant from './ButtonStagnant'
import InputWeight from './InputWeight'

const index = () => {

  return (
    <div className='Store'>
      <h1 className='StoreTitle'>Inventario</h1>
      {/* <form className='StoreWaste'> */}
        <div className='WasteWeight'>
          <WasteSelect/><InputWeight/>
        </div>
        <div className='StoredStagnantSubmit'>
          <StoredSelect/><ButtonStagnant/>
          {/* <button className='SubmitButtonWaste' type='submit'>💾</button> */}
        </div>
      {/* </form> */}
    </div>
  )
}

export default index