var o = { a: 1, b: 2 }

var a = o.a
var b = o.b

console.log(a, b) // 1 2 

//----------------------//
//declaramos "a" y "b" que toman los valorees que toman las propiedades "a" y "b" del objeto
// si la variable es igual a la propiedad


var o = { a: 1, b: 2 }
//declaro la variable "a" a partir de la propiedad "a" del objeto

var { a } = o
var { b } = o

console.log(a, b) // 1 2


//----------------------//

var o = { a: 1, b: 2 }

// en el objeto dame la propiedad "a" y ponla en la variable "b"
var { a, b } = o

console.log(a, b) // 1 2

//----------------------//

var o = { a: 1, b: 2 }
// creamos alias de los nobres de las propiedades, sedeclaran A y B que toman las propiedades "a" y "b" e o
var { a: A, b: B } = o

console.log(A, B) // 1 2

// WARN

// en este caso a y b no son ninguna variable
console.log(a, b) // Uncaught ReferenceError: a is not definedat <anonymous>:7:13

//----------------------//
// another example

var n = [1, 2]

// que propiedad del objeto va a referenciar el el 1?, la propiedad posicion 0.
// del objeto n declaro variables a y b como propiedad 0 y 1 
// hemos destructurado un array como un objeto 


var { 0: a, 1: b } = n

console.log(a, b)//  1 2

// equal to
// los arrays tambien tienen un desestructuring mas rapido

var n = [1, 2]

var [a, b] = n

console.log(a, b) //  1 2

// only want b

var n = [1, 2]

var [, b] = n

console.log(b) //  2

// only want c

var n = [1, 2, 3]

var [, , c] = n
console.log(c) // 4 3

// destructuring top

var o = {
    a: 1,
    b: [
        2,
        [
            3,
            {
                4: [
                    5,
                    {
                        hello: 'world'
                    },
                    6
                ],
                7: 'seven',
                8: 'eight'
            },
            9
        ],
        10
    ],
    c: 11
}

//var hello = o.b[1][1][4][1].hello
var { b: [, [, { 4: [, { hello }] }]] } = o

console.log(hello)
// world