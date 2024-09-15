import Label from './Label'
import Input from './Input'

function Field({ id, type, value, children, placeholder, disabled = false }) {
    return <div className='Field'>
        <Label htmlFor={id}>{children}</Label>
        <Input id={id} type={type} value={value} placeholder={placeholder} disabled={disabled} />
    </div>
}

export default Field 