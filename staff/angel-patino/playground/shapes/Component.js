function Component(tagNameOrContainer) {
    if(typeof tagNameOrContainer === 'String')
    this.container = document.createElement(tagNameOrCOntainer)
    else if (tagNameOrContainer)
}

Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}