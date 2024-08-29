import Input from './Input'
import Label from './Label'
import './Field.css'

function Field({ id, type, placeholder, children }) {
    return <div className='Field'>
        <Label className='Label' htmlFor={id}>{children}</Label>
        <Input className='Input' id={id} type={type} placeholder={placeholder} />
    </div>
}

export default Field
