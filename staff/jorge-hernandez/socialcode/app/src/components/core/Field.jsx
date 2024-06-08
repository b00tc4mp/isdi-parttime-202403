import './Field.css'
import Input from './Input'
import Label from './Label'

function Field({ id, type, placeholder, children }) {
  return (
    <div className='Field'>
      <Label htmlFor={id} placeholder={placeholder}>
        {children}
      </Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  )
}

export default Field
