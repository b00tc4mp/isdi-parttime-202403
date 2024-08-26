import Label from '../Label'
import TextArea from '../TextArea'

import '../Field/index.css'

function FieldWithTextArea({ id, type, placeholder, children }) {
    return <div className='FieldWithTextArea'>
        <Label htmlFor={id}>{children}</Label>
        <TextArea id={id} type={type} placeholder={placeholder} />
    </div>
}

export default FieldWithTextArea