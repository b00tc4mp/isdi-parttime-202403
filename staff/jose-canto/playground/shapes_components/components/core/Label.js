// Definimos la clase Label que hereda de la clase Component
function Label() {
  // Llamamos al constructor de Component con el argumento "lable"
  Component.call(this, "lable")
}

// Configuramos la cadena de prototipos para las instancias de Label
Label.prototype = Object.create(Component.prototype)

// Establecemos la propiedad constructor de Label.prototype para mantener la referencia correcta al constructor
Label.prototype.constructor = Label