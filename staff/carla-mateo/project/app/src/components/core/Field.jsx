import Label from './Label'
import Input from './Input'

export default function Field({ id, type, placeholder, children }) {
    return <div className='flex flex-col mb-2 mt-2 h-fit border border-black rounded bg-green-100'>
        <Label htmlFor={id}>{children}</Label>
        <Input id={id} type={type} placeholder={placeholder} />
    </div>
}

