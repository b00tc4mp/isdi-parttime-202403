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

### `➡️ RECURSION`

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
