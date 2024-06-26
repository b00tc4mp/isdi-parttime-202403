    import './Input.css'
    
    function Input({ id, type, placeholder }) {
        return <input className="Input" id={id} type={type} placeholder={placeholder} />
    }

    export default Input