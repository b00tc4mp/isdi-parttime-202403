//Recivimos las props en la funcion.
//para devolver el contenido dentro del tag usamos props.children

/* function Label(props){
    return <label className = "Label" htmlFor ={props.htmlFor}>{props.children}</label>
}

//REFACTORING
/* function Label({ props }) {
    const { htmlFor, children } = props
    return <label className="Label" htmlFor={htmlFor}>{children}</label>
}*/

//REFACTORING
function Label({ htmlFor, children }) {
    return <label className="Label" htmlFor={htmlFor}>{children}</label>
}

export default Label
