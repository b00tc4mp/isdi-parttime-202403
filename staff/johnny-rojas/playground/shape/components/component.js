// Con esto creamos el contenedor de sintaxis html <etiqueta> o container

function Component(tagNameOrContainer) {
  if (typeof tagNameOrContainer === 'string')
      this.container = document.createElement(tagNameOrContainer)
  else if (tagNameOrContainer instanceof HTMLElement)
      this.container = tagNameOrContainer
  else
      throw new Error('tagNameOrContainer is not a tagName or container')

  this.children = []
}

// No agrupa los child de un component en un array

Component.prototype.add = function (child) {
  if (!(child instanceof Component)) throw new TypeError('child is not component')

  this.children.push(child)

  this.container.appendChild(child.container)
}

// Cuando quieres añadir un "superpoder" a la funcion constructora

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