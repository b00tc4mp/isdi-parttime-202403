// Definimos una función constructora Component que acepta un parámetro:
// - tagNameOrContainer: puede ser un nombre de etiqueta HTML o un elemento HTML existente.
function Component(tagNameOrContainer) {
  // Si el parámetro es una cadena, creamos un nuevo elemento HTML con ese nombre de etiqueta y lo asignamos al atributo "container" del objeto.
  if (typeof tagNameOrContainer === "string") {
    this.container = document.createElement(tagNameOrContainer)
  }
  // Si el parámetro es un elemento HTML, lo asignamos directamente al atributo "container" del objeto.
  else if (tagNameOrContainer instanceof HTMLElement) {
    this.container = tagNameOrContainer
  }
  // Si el parámetro no es una cadena ni un elemento HTML, lanzamos un error.
  else {
    throw new Error("tagNameOrContainer debe ser una cadena o un elemento HTML")
  }
}

// Agregamos un método a los objetos Component:
Component.prototype.add = function (child) {
  // Este método agrega el "container" del hijo al "container" del padre.
  this.container.appendChild(child.container)
}


Component.prototype.setText = function (text) {
  // Este método establece el contenido textual del "container" con el texto proporcionado.
  this.container.innerText = text
}

Component.prototype.setId = function (id) {
  this.container.id = id
}

// Este método agrega una clase CSS al "container" del componente.
Component.prototype.addClass = function (clazz) {
  this.container.classList.add(clazz)
}

Component.prototype.removeClass = function (clazz) {
  this.container.classList.remove(clazz)
}

Component.prototype.onClick = function (listener) {
  this.container.addEventListener("click", listener)
}