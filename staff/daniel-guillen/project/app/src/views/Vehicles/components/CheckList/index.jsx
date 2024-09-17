import React from 'react'
import './index.css'

const CheckList = ({ title, items, handleRadioChange }) => (
  <div className='RenderSection'>

    <h2 className='title'>{title}</h2>
    
    <div className='CheckList'>
    
      {items.map(item => (
    
    <div className={`CheckElement ${item.selectedValue}`} key={item.id}>
    
          <div className='ElementTitle'>
    
            <p>{item.elemento}</p>
    
          </div>
    
          <div className='RadioGroup'>
    
            <label>
    
              <input
                type='radio'
                name={item.id}
                value='CORRECTO'
                checked={item.selectedValue === 'CORRECTO'}
                onChange={() => handleRadioChange(item.id, 'CORRECTO')}
              />
              👍
            </label>
    
            <strong className='StatusValue'>{item.selectedValue}</strong>
    
            <label>
    
              <input
                type='radio'
                name={item.id}
                value='ARREGLAR'
                checked={item.selectedValue === 'ARREGLAR'}
                onChange={() => handleRadioChange(item.id, 'ARREGLAR')}
              />
              🔧
            </label>
    
          </div>
    
        </div>
    
    ))}
    
    </div>
  
  </div>
)

export default CheckList
