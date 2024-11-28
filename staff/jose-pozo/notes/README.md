# **MY NOTES** <img src="image.png" alt="alt text" style="width:50px;height:50px;">

## **BASH COMMANDS**

## **CURIOSITIES**

### `👀 PONER ICONOS EN LA TERMINAL DE BASH`

```js
➡️ vi ~/.bashrc
```

> El comando abre el archivo .bashrc en el editor de texto vi.

```js
➡️ PS1='\u \h \w 🙂'
```

> El comando PS1='\u \h \w 🙂' define la variable de entorno PS1, que controla el formato del prompt en la terminal de Bash.

> \u: Representa el nombre de usuario actual.<br>
> \h: Representa el nombre del host.<br>
> \w: Representa el nombre del directorio actual.<br>
> 🙂: Un emoji Unicode que se mostrará en el prompt.

## **GIT COMMANDS**

### `➡️ git add <path>`

> El comando git add añade contenido del directorio de trabajo al área de ensayo (staging area o 'index') para la próxima confirmación. Cuando se ejecuta el comando git commit, éste, de forma predeterminada, sólo mira en esta área de ensayo, por lo que git add se utiliza para fabricar exactamente lo que te gustaría fuese tu próxima instantánea a confirmar.

### `➡️ git add.`

> Este comando añade al índice ('index') cualquier fichero nuevo o que haya sido modificado.

## **JS CONCEPTS**

### `👀 CALLBACK FUNCTION`

> Una función callback es aquella que es pasada como argumento a otra función para que sea "llamada de nuevo" (call back) en un momento posterior. Una función que acepta otras funciones como argumentos es llamada función de orden-superior (High-Order), y contiene la lógica para determinar cuándo se ejecuta la función callback. Es la combinación de estas dos la que nos permite ampliar nuestra funcionalidad.

> Lo primero que tenemos que saber es que en Javascript, las funciones son objetos de primera clase. Como tales, podemos trabajar con ellos de la misma forma que trabajamos con otros objetos, como asignarlos a variables y pasarlos como argumentos a otras funciones.

### `👀 CALL STACK`

> El "call stack" (pila de llamadas) en JavaScript es una estructura de datos que se utiliza para gestionar la ejecución de funciones en el programa. Cuando se llama a una función en JavaScript, se coloca en la parte superior de la pila de llamadas. A medida que se ejecuta esa función, cualquier otra función que llame dentro de ella también se apila encima de la anterior, y así sucesivamente.

> Cuando una función termina de ejecutarse, se elimina de la pila de llamadas, y el control vuelve a la función que la llamó. Esto se conoce como el principio de "último en entrar, primero en salir" (LIFO, por sus siglas en inglés).

> La pila de llamadas es esencial para el funcionamiento del motor de JavaScript, ya que determina el orden en que se ejecutan las funciones y gestiona la ejecución asíncrona mediante el uso de mecanismos como callbacks, promesas y async/await.

> Un ejemplo simple de cómo funciona la pila de llamadas sería:

```js
function funcionA() {
  console.log("Inicio de funcionA");
  funcionB();
  console.log("Fin de funcionA");
}

function funcionB() {
  console.log("Inicio de funcionB");
  console.log("Fin de funcionB");
}

funcionA();

/*
Salida: "Inicio de funcionA"
Salida: "Inicio de funcionB"
Salida: "Fin de funcionB"
Salida: "Fin de funcionA"
*/"
```

> En este ejemplo, cuando se llama a funcionA(), se agrega a la pila de llamadas, y dentro de ella, funcionB() también se agrega a la pila. Cuando funcionB() termina de ejecutarse, se elimina de la pila, y luego funcionA() termina y se elimina de la pila.

### `👀 CLOSURE`

> En JavaScript, un "closure" (o cierre) es una función que "recuerda" el ámbito en el que fue creada y tiene acceso a las variables de ese ámbito incluso después de que la función haya terminado de ejecutarse. Esto se debe a que la función interna tiene acceso a las variables locales de la función externa, incluso después de que la función externa haya finalizado su ejecución.

> Los closures son extremadamente útiles en JavaScript porque permiten crear funciones que actúan como "envolventes" para proteger datos sensibles o para mantener el estado entre llamadas de función. Se utilizan comúnmente en situaciones como manejo de eventos, programación asíncrona y para crear funciones de fábrica.

> Aquí hay un ejemplo de cómo se ve un closure en JavaScript:

```js
function crearMultiplicador(factor) {
  // Esta función interna es un closure
  function multiplicar(numero) {
    return numero * factor;
  }

  return multiplicar;
}

// Creamos un multiplicador que multiplica por 5
var multiplicarPor5 = crearMultiplicador(5);

console.log(multiplicarPor5(3)); // Imprimirá: 15
console.log(multiplicarPor5(7)); // Imprimirá: 35
```

> En este ejemplo, crearMultiplicador es una _función de fábrica$^1$ (factory function)_ que toma un factor como argumento y devuelve una función interna multiplicar. Esta función interna es un closure que tiene acceso al factor pasado como argumento a crearMultiplicador. Cuando llamamos a multiplicarPor5 con un número, este número se multiplica por 5, que es el factor establecido, gracias al closure que mantiene la referencia al factor. Esto demuestra cómo los closures pueden usarse para encapsular datos y comportamientos dentro de funciones.

> _Función de fábrica$^1$ (factory function):_ En JavaScript, una función de fábrica es una función que devuelve un objeto. Se llama función de fábrica porque crea y devuelve un nuevo objeto cada vez que se llama, tal como una fábrica crea y produce nuevos productos.

### `👀 HOISTING`

> El "hoisting" en JavaScript es un comportamiento que ocurre durante la fase de compilación del código, donde las declaraciones de variables y funciones son movidas hacia arriba, o "elevadas", al inicio del contexto de ejecución. Esto significa que las variables pueden ser utilizadas antes de ser declaradas explícitamente en el código.

> El hoisting en JavaScript aplica tanto a las declaraciones de variables (var) como a las declaraciones de funciones (function). Sin embargo, hay una diferencia importante entre cómo se aplica el hoisting a estas dos.

> Para las variables (declaradas con var), el hoisting solo eleva la declaración de la variable, no la inicialización. Esto significa que la variable existe en el ámbito en el que fue declarada, pero su valor inicial será undefined hasta que se le asigne un valor explícitamente.

```js
console.log(x); // undefined
var x = 5;
console.log(x); // 5
```

> En el caso de las funciones, el hoisting eleva tanto la declaración como la definición de la función. Esto significa que una función declarada de esta manera puede ser invocada antes de su declaración en el código.

```js
foo(); // "Hello, world!"

function foo() {
  console.log("Hello, world!");
}
```

> Sin embargo, es importante tener en cuenta que el hoisting solo mueve las declaraciones hacia arriba, no el código en sí. Por lo tanto, aunque JavaScript "eleva" las declaraciones, el orden de ejecución del código permanece igual. Esto puede llevar a comportamientos inesperados si no se entiende correctamente. Por esta razón, es una buena práctica declarar todas las variables y funciones al inicio del ámbito en el que son utilizadas, para evitar confusiones y errores potenciales.

> Además, con la introducción de let y const en ECMAScript 6, se recomienda utilizar estas en lugar de var, ya que tienen un comportamiento de alcance más predecible y no se ven afectadas por el hoisting en la misma medida.

### `👀 IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSION)`

> IIFE significa Expresión de Función Inmediatamente Invocada en JavaScript. Es un patrón comúnmente utilizado para crear una función y ejecutarla inmediatamente después de su definición. Este patrón se utiliza a menudo para crear un ámbito privado para las variables, evitando que contaminen el ámbito global.

> Aquí tienes un ejemplo básico de un IIFE:

```js
(function () {
  // Tu código aquí
  var x = 10;
  console.log(x); // Salida: 10
})();
```

> En este ejemplo, la función se define dentro de paréntesis (function(){}), y está inmediatamente seguida por otro par de paréntesis (), que invoca la función inmediatamente después de su definición.

> Un caso de uso común para IIFE es encapsular variables, evitando que sean accesibles fuera de la función:

```js
(function () {
  var x = 10;
  console.log(x); // Salida: 10
})();

console.log(x); // Salida: Uncaught ReferenceError: x no está definido
```

> En este ejemplo, x está dentro del ámbito del IIFE y no es accesible desde fuera de él.

> IIFE también puede tomar parámetros:

```js
(function (mensaje) {
  console.log(mensaje); // Salida: ¡Hola, Mundo!
})("¡Hola, Mundo!");
```

> En este ejemplo, la cadena "¡Hola, Mundo!" se pasa como argumento al IIFE y se registra dentro de la función.

> IIFE es una herramienta útil para modularizar código, gestionar ámbitos y evitar conflictos en los espacios de nombres globales.

### `👀 IMPERATIVE VS DECLARATIVE PROGRAMMING`

> En JavaScript, "imperative" y "declarative" son dos estilos de programación que describen cómo se escribe el código para lograr un objetivo específico.

> Programación Imperativa: En la programación imperativa, se le dice a la computadora exactamente cómo realizar una tarea paso a paso. Esto implica dar instrucciones detalladas sobre cómo cambiar el estado de los datos y cómo realizar cada acción. El código imperativo se centra en el "cómo" se deben hacer las cosas.

> Ejemplo de código imperativo en JavaScript:

```js
let numbers = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log(sum); // Output: 15
```

> En este ejemplo, se utiliza un bucle for para recorrer el array numbers y sumar sus elementos uno por uno.

> Programación Declarativa: En la programación declarativa, en cambio, te concentras en describir qué quieres lograr, sin preocuparte por los detalles de cómo se realizará. El enfoque es más abstracto y se centra en las relaciones y transformaciones de los datos. En la programación declarativa, le dices al programa "qué" hacer, y el lenguaje o el entorno de programación se encargan de descubrir "cómo" hacerlo.

> Ejemplo de código declarativo en JavaScript:

```js
let numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // Output: 15
```

> En este ejemplo, se utiliza el método reduce() para sumar todos los elementos del array numbers. No se especifica cómo se debe realizar la suma, solo se describe el resultado deseado.

> En resumen, en la programación imperativa se describe explícitamente cómo se deben realizar las operaciones paso a paso, mientras que en la programación declarativa se define qué se quiere lograr sin preocuparse por los detalles de implementación. Ambos enfoques tienen sus ventajas y desventajas, y la elección entre ellos depende del problema específico que se esté resolviendo y de las preferencias del programador.

### `👀 LEXICAL SCOPE`

> El "lexical scope" (ámbito léxico) es un concepto fundamental en la programación que se refiere al conjunto de reglas que determinan el alcance de las variables y cómo se resuelven las referencias a esas variables en un programa. En términos simples, el alcance léxico se refiere al entorno léxico en el que se define una variable, es decir, dónde se encuentra físicamente en el código.

> En JavaScript, el ámbito léxico se determina en tiempo de compilación, basándose en la estructura del código fuente, y no cambia en tiempo de ejecución. Esto significa que las funciones anidadas tienen acceso al alcance de las funciones que las contienen, y no al revés.

> Veamos un ejemplo para ilustrar el concepto:

```js
function exterior() {
  var mensaje = "Hola";

  function interior() {
    console.log(mensaje);
  }

  interior();
}

exterior(); // Salida: "Hola"
```

> En este ejemplo, la función interior() está definida dentro de la función exterior(), por lo que tiene acceso al alcance léxico de exterior(), incluyendo la variable mensaje. Esto es posible debido al ámbito léxico en JavaScript: las funciones internas tienen acceso al alcance de las funciones externas en las que están definidas.

> El ámbito léxico es importante porque determina cómo se resuelven las referencias a variables en un programa. Cuando se hace referencia a una variable dentro de una función, el intérprete de JavaScript busca primero en el ámbito léxico más interno (el de la función actual) y luego en ámbitos léxicos más externos, hasta encontrar la variable o llegar al ámbito global. Si la variable no se encuentra en ningún ámbito léxico, se genera un error de referencia.

### `👀 RECURSION`

> La recursión en JavaScript es un concepto en programación donde una función se llama a sí misma para resolver un problema. En lugar de utilizar un bucle iterativo como un bucle for o while, la recursión implica la división de un problema en casos más pequeños y llamando a la misma función con estos casos más pequeños hasta que se alcance un caso base donde se puede resolver directamente.

> El 'caso base' en la recursión es la condición que detiene la recursión. Es la condición que, cuando se cumple, hace que la función recursiva deje de llamarse a sí misma y comience a devolver valores sin hacer más llamadas recursivas.
>
> En otras palabras, el caso base es una condición de terminación que evita que la función recursiva continúe ejecutándose indefinidamente. Cada función recursiva debe tener al menos un caso base para garantizar que eventualmente se alcance una solución.

> En JavaScript, la recursión se puede utilizar para resolver una variedad de problemas; sin embargo, es importante tener en cuenta que la recursión debe manejarse cuidadosamente para evitar el desbordamiento de la pila de llamadas, especialmente en situaciones donde hay una gran profundidad recursiva.

```js
function sumaNaturales(n) {
  // Caso base: si n es 0, la suma es 0
  if (n === 0) {
    return 0;
  } else {
    // Caso recursivo: sumar n con la suma de los primeros n-1 números naturales
    return n + sumaNaturales(n - 1);
  }
}

// Ejemplo de uso
console.log(sumaNaturales(5)); // Resultado: 15 (5 + 4 + 3 + 2 + 1)
```

## **NODE COMMANDS IN VS CODE**

### `➡️ node <path> `

> Ejecuta un archivo con node desde la terminal de VS Code.

### `➡️ node --inspect-brk <path> `

> Ejecuta un archivo con node desde la terminal de VS Code con 'debugger'.
