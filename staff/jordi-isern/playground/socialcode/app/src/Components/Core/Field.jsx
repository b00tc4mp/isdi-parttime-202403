import './Field.css'
import Label from './Label'
import Input from './Input'

function Field({id, type, placeholder, children}) {
    return <div className='Field'>
        <Label htmlFor={id}>{children}</Label>
        <Input id={id} type={type} placeholder={placeholder}/>
    </div>
}

export default Field