function Component(tagNameOrComponent) {
    if (typeof tagNameOrComponent === 'string')
        this.container = document.createElement(tagNameOrComponent)
    else if (tagNameOrComponent instanceof HTMLElement)
        this.container = tagNameOrComponent
    else
        throw new Error('tagNameOrContainer is not a tagName or container')
}   

Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

Component.prototype.setText = function (text) {
    this.container.innerText = text
}

Component.prototype.setId = function(id) {
    this.container.id = id
}

Component.prototype.addClass = function (clazz) {
    this.container.classList.add(clazz)

}

Component.prototype.removeClass = function (clazz) {
    this.container.classList.remove(clazz)

}



