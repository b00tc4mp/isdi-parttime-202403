import Label from '../Label'
import Input from '../Input'

import './index.css'

function Field({ id, type, placeholder, children, onChange, className }) {
    return <div className={`Field ${className ? className : ''}`}>
        <Label htmlFor={id}>{children}</Label>
        <Input id={id} type={type} placeholder={placeholder} onChange={onChange} />
    </div>
}

export default Field