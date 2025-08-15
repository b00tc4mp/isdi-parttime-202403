class Component {
    constructor(tagNameOrContainer = "div") {
        if (typeof tagNameOrContainer === "string")
            this.container = document.createElement(tagNameOrContainer)
        else if (tagNameOrContainer instanceof HTMLElement || tagNameOrContainer instanceof HTMLDocument)
            this.container = tagNameOrContainer
        else
            throw new Error("tagNameOrContainer is not a tagName or container")

        //Comprueba si es un componente nuevo o si ya exsiste para poder soportarlo y poder añadir por Ej el body como new component
        this.children = []
    }
    add(child) {
        if (!(child instanceof Component)) throw new TypeError("child is not component")

        this.children.push(child)

        this.container.appendChild(child.container)
    }

    remove(child) {
        if (!(child instanceof Component)) throw new TypeError("child is not component")

        //usamos splice para seleccionar el child que queremos eliminar del array children
        const index = this.children.indexOf(child)

        if (index > -1)
            this.children.splice(index, 1)

        //Manera de evitar error del clear
        if (this.container.contains(child.container))
            this.container.removeChild(child.container)
    }

//TODO entender esto?¿?
    removeAll() {

        //this.children.forEach(child => this.remove(child))
        //Hacemos una copia del array para tomarlo como referenia con el metodo concat()
        //De esta manera ira recorriendo el array sin alterar los indices y evitar que se modifique l array original
        const children = this.children.concat()

        children.forEach(child => this.remove(child))
    }
    setText(text) {
        this.container.innerText = text
    }

    setId(text) {
        this.container.id = text
    }

    addClass(clazz) {
        this.container.classList.add(clazz)
    }

    removeClass(clazz) {
        this.container.classList.remove(clazz)
    }

    onClick(listener) {
        this.container.addEventListener("click", listener)
    }

    onKeyDown(listener) {
        this.container.addEventListener("keydown", listener)
    }

    onKeyUp(listener) {
        this.container.addEventListener("keyup", listener)
    }
}