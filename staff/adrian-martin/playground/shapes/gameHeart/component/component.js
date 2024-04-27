function Component(tagNameOrContainer){
    if(typeof tagNameOrContainer === 'string')
    this.container = document.createElement(tagNameOrContainer)

    else if(tagNameOrContainer instanceof HTMLElement)
    this.container = tagNameOrContainer

    else
        throw new Error('tagNameOrContainer is not a tagName or container')

    this.children = []
}

Component.prototype.add = function(child) {
    // if(!(child instanceof Component)) throw new TypeError('child is not component')

    this.children.push(child)

    this.container.appendChild(child.container)
}