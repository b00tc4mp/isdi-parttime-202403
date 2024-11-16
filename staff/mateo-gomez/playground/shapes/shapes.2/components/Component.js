class Component {
    constructor(tagNameOrComponent = 'div') {
        if (typeof tagNameOrComponent === 'string')
            this.container = document.createElement(tagNameOrComponent)
        else if (tagNameOrComponent instanceof HTMLElement || tagNameOrComponent instanceof HTMLDocument)
            this.container = tagNameOrComponent
        else
            throw new Error('tagNameOrContainer is not a tagName or container')

        this.children = []
    }

    add(child) {
        if (!(child instanceof Component)) throw new TypeError('child is not component')

        this.children.push(child)

        this.container.appendChild(child.container)
    }

    setText(text) {
        this.container.innerText = text
    }

    setId(id) {
        this.container.id = id
    }

    addClass(clazz) {
        this.container.classList.add(clazz)

    }

    removeClass(clazz) {
        this.container.classList.remove(clazz)

    }

    onClick(listener) {
        this.container.addEventListener('click', listener)
    }

    onKeyDown(listener) {
        this.container.addEventListener('keydown', listener)
    }

    onKeyUp(listener) {
        this.container.addEventListener('keyup', listener)
    }
}