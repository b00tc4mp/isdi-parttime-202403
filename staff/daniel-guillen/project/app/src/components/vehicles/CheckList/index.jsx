import './index.css'
import { Text, SubTitle } from '../../core'

const CheckList = ({ title, items, handleRadioChange }) => (
  <div className='RenderSection'>
    <SubTitle>{title}</SubTitle>
      <div className='CheckList'>
    
      {items.map(item => (
          <div className={`CheckElement ${item.selectedValue}`} key={item.id}> 
          <Text className='ElementTitle'>{item.elemento}</Text>    
            
            <div className='RadioGroup'>
              <label><input
                          type='radio'
                          name={item.id}
                          value='CORRECTO'
                          checked={item.selectedValue === 'CORRECTO'}
                          onChange={() => handleRadioChange(item.id, 'CORRECTO')}
                        />👍
              </label>
                        <Text className='StatusValue'>{item.selectedValue}</Text>
              <label><input
                          type='radio'
                          name={item.id}
                          value='ARREGLAR'
                          checked={item.selectedValue === 'ARREGLAR'}
                          onChange={() => handleRadioChange(item.id, 'ARREGLAR')}
                        />🔧  
              </label>
            </div>

        </div>
    ))}
    
      </div>
  </div>
)

export default CheckList
