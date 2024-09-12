function Component(tagNameOrContainer) {
    if (typeof tagNameOrContainer === 'string')
        this.container = document.createElement(tagNameOrContainer)
    else if (tagNameOrContainer instanceof HTMLElement || tagNameOrContainer instanceof HTMLDocument)
        this.container = tagNameOrContainer
    //container is un elemento de html ya existente y tagName es un elemento de tipo string
    else
        throw new Error('tagNameOrContainer is not a tagName or container')

    this.children = []
}

Component.prototype.add = function (child) {
    if (!(child instanceof Component)) throw new TypeError('child is not component')
    this.children.push(child)

    this.container.appendChild(child.container)
}

Component.prototype.setText = function (text) {
    this.container.innerText = text
}

Component.prototype.setId = function (id) {
    this.container.id = id
}

Component.prototype.addClass = function (clazz) {
    this.container.classList.add(clazz)
}

Component.prototype.removeClass = function (clazz) {
    this.container.classList.remove(clazz)
}

Component.prototype.onClick = function (listener) {
    this.container.addEventListener('click', listener)
}

Component.prototype.onKeyDown = function (listener) {
    this.container.addEventListener('keydown', listener)
}

Component.prototype.onKeyUp = function (listener) {
    this.container.addEventListener('keyup', listener)
}