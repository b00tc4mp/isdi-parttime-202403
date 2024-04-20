function Component(tagnameOrContainer) {
  this.container = document.createElement(tagnameOrContainer)
  this.children = []
}

Component.prototype.add = function (child) {
  this.container.appendChild(child.container)
  this.children.push(child)
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
