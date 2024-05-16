function hello(to) {
    debugger
    console.log(`${this.from}: Hello, ${to}!`)
}

var o = {}

hello.call(o, 'Peter')

//escribes en consola, una vez q el debuger ha empezado:


/* this
 el resultado es un objeto // { }
despues en consola, tb mientras el debugger esta en marcha, escribes:
this === o
 el resultado es // true
 */

// y el resultado final de llamar a la funcion con -hello.call(o, 'Peter')- es:
//'undefined: Hello, Peter!'

