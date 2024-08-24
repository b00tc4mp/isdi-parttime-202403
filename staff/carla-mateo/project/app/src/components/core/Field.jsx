import Label from './Label'
import Input from './Input'

export default function Field({ id, type, placeholder, children }) {
    return <div className='flex flex-col m-[.25rem_0]'>
        <Label htmlFor={id}>{children}</Label>
        <Input id={id} type={type} placeholder={placeholder} />
    </div>
}

