// Definimos la clase Input que hereda de la clase Component
function Input() {
  // Llamamos al constructor de Component con el argumento "input"
  Component.call(this, "input")
}

// Configuramos la cadena de prototipos para las instancias de Input
Input.prototype = Object.create(Component.prototype)

// Establecemos la propiedad constructor de Input.prototype para mantener la referencia correcta al constructor
Input.prototype.constructor = Input

Input.prototype.setType = function (type) {
  this.container.type = type
}

Input.prototype.setPlaceholder = function (placeholder) {
  this.container.placeholder = placeholder
}

Input.prototype.setRequired = function () {
  this.container.required = "required"
}

