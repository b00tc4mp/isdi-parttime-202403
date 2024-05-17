Call: llama a una funcion con un valor dado this y con argumentos provistos individualmente

function.call(thisArg[, arg1[, arg2[, ...]]])

# Example 1, use the .call to concat the constructor to the object

You can .call to concat constructor to object

In this example, the constructor PRODUCTO is defined with two param, NOMBRE and PRECIO

Other two function COMIDA and JUGUETE invoke a PRODUCTO passing `this`, NOMBRE and PRECIO.
PRODUCTO initialize the properties NOMBRE and PRECIO, both function defined the CATEGORY

```
    function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;

    if (precio < 0)
        throw RangeError(
        'No se puede crear el producto "' + nombre + '" con un precio negativo',
        );
    return this;
    }

    function Comida(nombre, precio) {
    Producto.call(this, nombre, precio);
    this.categoria = "comida";
    }
    Comida.prototype = new Producto();

    function Juguete(nombre, precio) {
    Producto.call(this, nombre, precio);
    this.categoria = "juguete";
    }
    Juguete.prototype = new Producto();

    var queso = new Comida("feta", 5);
    var diversion = new Juguete("robot", 40);
```
## Paso a paso
```
1.Función Constructora Producto:

    ·Define una función llamada Producto que toma dos parámetros: nombre y precio.

    ·Dentro de esta función:

        -Asigna los valores nombre y precio a las propiedades nombre y precio del objeto actual (usando this).

        -Verifica si el precio es menor que cero. Si lo es, lanza un error de rango con un mensaje específico.
        Retorna el objeto actual.

2.Funciones Constructoras Comida y Juguete:

    ·Ambas funciones se definen de manera similar a Producto.

    ·Cada una llama a la función Producto usando call() para establecer el contexto (this) en el nuevo objeto creado.

    ·Además, cada una define una propiedad adicional categoria con un valor específico ("comida" para Comida y "juguete" para Juguete).

3.Herencia Prototípica:

    ·Después de definir Comida y Juguete, se establece la herencia prototípica.

    ·Comida.prototype y Juguete.prototype se asignan a un nuevo objeto creado con Producto, lo que significa que los objetos creados a partir de Comida y Juguete heredarán las propiedades y métodos de Producto.

4.Creación de Objetos:

    ·Se crean dos objetos: queso y diversion.

    ·queso es una instancia de Comida con el nombre "feta" y precio 5.

    ·diversion es una instancia de Juguete con el nombre "robot" y precio 40.
```

# Example 2, use the .call to invoke the anonymous function

In this example, create a anonymous function and use the .call to invoke on each object

The main purpose of the anonymous function here is to add a print function to each object, which can print the correct index in the array.

```
    var animales = [
    { especie: "Leon", nombre: "Rey" },
    { especie: "Whale", nombre: "Fail" },
    ];

    for (var i = 0; i < animales.length; i++) {
    (function (i) {
        this.imprimir = function () {
        console.log("#" + i + " " + this.especie + ": " + this.nombre);
        };
        this.imprimir();
    }).call(animales[i], i);
    }
```
## Paso a paso
```
1.Declaración del Array de Animales:

    ·Se define un array llamado animales que contiene dos objetos, cada uno representando a un animal con propiedades especie y nombre.

2.Bucle for:

    ·Se utiliza un bucle for para iterar sobre cada elemento del array animales.

    ·La variable i se utiliza como un contador para acceder a cada elemento del array.

3.Función Anónima Dentro del Bucle:

    ·Dentro del bucle for, se define una función anónima que toma un parámetro i.

    ·Esta función anónima se invoca inmediatamente después de ser definida, utilizando .call(animales[i], i).

    ·La función anónima se invoca con this apuntando al objeto actual en animales[i], y se pasa i como argumento.

4.Definición de Método imprimir:

    ·Dentro de la función anónima, se define un método llamado imprimir.

    ·Este método imprime en la consola el índice (i), la especie y el nombre del animal.

5.Invocación del Método imprimir:

    ·Después de definir el método imprimir, se llama inmediatamente dentro de la función anónima.
```