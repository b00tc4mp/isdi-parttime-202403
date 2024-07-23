import "./FieldInput.css"

import Label from "../Core/Label";
import Input from "../Core/Input";

function Field({id, type, placeholder, children}){
    return <div className="'FieldInput">
        <Label htmlFor={id}>{children}</Label>
        <div className="divinput">
            <Input id={id} type={type} placeholder={placeholder}/>
        </div>
    </div>
}

export default FieldInput