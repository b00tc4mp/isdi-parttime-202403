import "./index.css"

export default function Field({ id, type, placeholder }) {
    return <div className="Field">
        <input id={id} type={type} placeholder={placeholder}></input>
    </div>

}