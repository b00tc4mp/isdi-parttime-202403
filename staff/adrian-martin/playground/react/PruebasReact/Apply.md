Apply: invoca una determinada funcion asignando explicitamente el objeto `this` y un array o similar como parametros

```fun.apply(thisArg[, argsArray])```

# Example 1, use .apply to concat the constructor

You can use `apply` to concat the constructor to object

In this example a global method is created to Function called construct
```
Function.prototype.construct = function (aArgs) {
  var fConstructor = this,
    fNewConstr = function () {
      fConstructor.apply(this, aArgs);
    };
  fNewConstr.prototype = fConstructor.prototype;
  return new fNewConstr();
};
```
```
function MyConstructor() {
  for (var nProp = 0; nProp < arguments.length; nProp++) {
    this["property" + nProp] = arguments[nProp];
  }
}

var myArray = [4, "Hello world!", false];
var myInstance = MyConstructor.construct(myArray);

alert(myInstance.property1); // alerts "Hello world!"
alert(myInstance instanceof MyConstructor); // alerts "true"
alert(myInstance.constructor); // alerts "MyConstructor"
```
## Paso a paso
```
1.Extensión de Function.prototype:

    ·Se agrega un nuevo método llamado construct al prototipo de la función en JavaScript (Function.prototype).

2.Definición del Método construct:

    ·El método construct toma un parámetro aArgs, que es un array de argumentos que se pasarán a la función constructora.

    ·Dentro del método construct, se guarda la referencia a la función constructora original (fConstructor) en una variable.

    ·Se define una nueva función (fNewConstr) que actuará como un constructor.

    ·Dentro de fNewConstr, se invoca la función constructora original (fConstructor) utilizando apply, pasando this y los argumentos aArgs.

    ·La propiedad prototype de fNewConstr se establece en la misma propiedad prototype de la función constructora original (fConstructor).

3.Creación de una Nueva Instancia:

    ·Finalmente, se devuelve una nueva instancia de la función constructora (fNewConstr) utilizando el operador new.
```
```
1.Definición de la Función Constructora MyConstructor:

    ·Se define una función constructora llamada MyConstructor.

    ·Esta función itera a través de los argumentos que recibe y asigna cada argumento a una propiedad del objeto que está siendo creado, utilizando un nombre de propiedad dinámico ("property" seguido del índice del argumento).

2.Creación del Array myArray:

    ·Se define un array llamado myArray que contiene tres elementos: el número 4, la cadena "Hello world!", y el valor booleano false.

3.Creación de una Instancia de MyConstructor con construct:

    ·Se llama al método construct que se definió previamente en Function.prototype, pasando myArray como argumento.

    ·Este método crea una instancia de MyConstructor utilizando los elementos de myArray como argumentos para el constructor.

    ·La instancia resultante se asigna a la variable myInstance.

4.Alertas:

    ·Se utilizan las funciones alert para mostrar el valor de algunas propiedades de myInstance.

    ·myInstance.property1 es "Hello world!", ya que es el segundo elemento de myArray.

    ·myInstance instanceof MyConstructor devuelve true, lo que indica que myInstance es una instancia de MyConstructor.

    ·myInstance.constructor devuelve "MyConstructor", que es el nombre de la función constructora utilizada para crear myInstance.
```