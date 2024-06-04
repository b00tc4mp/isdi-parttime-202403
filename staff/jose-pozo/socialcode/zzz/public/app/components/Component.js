class Component {
    constructor(tagNameOrContainer = 'div') {
        if (typeof tagNameOrContainer === 'string')
            this.container = document.createElement(tagNameOrContainer)
        else if (tagNameOrContainer instanceof HTMLElement || tagNameOrContainer instanceof HTMLDListElement)
            this.container = tagNameOrContainer
        else
            throw new Error('tagNameOrContainer is not a tagName or Container')

        this.children = []
    }

    add(child) {
        if (!(child instanceof Component)) throw new TypeError('child is not component')

        this.children.push(child)

        this.container.appendChild(child.container)
    }

    remove(child) {
        if (!(child instanceof Component)) throw new TypeError('child is not a component')

        const index = this.children.indexOf(child)

        if (index > -1)
            this.children.splice(index, 1)

        if (this.container.contains(child.container))
            this.container.removeChild(child.container)
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