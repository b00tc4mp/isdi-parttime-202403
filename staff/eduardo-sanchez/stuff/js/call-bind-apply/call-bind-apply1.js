function hello(to) {
    debugger
    console.log(`${this.from}: Hello, ${to}!`)
}

hello('Peter') // 'undefined: Hello, Peter!'
window.hello('Peter') // 'undefined: Hello, Peter!'
/* en node en vez de window se usa global para el contexto global
global.hello('Peter')
  el resultado es el mismo q con window // 'undefined: Hello, Peter!'
*/
var from = 'Wendy'
hello('Peter') // 'Wendy: Hello, Peter!'

var o = { from: 'Wendy' }
hello.call(o, 'Peter') // 'Wendy: Hello, Peter!'
hello.bind(o)('Peter') // 'Wendy: Hello, Peter!'
o.hello = hello
o.hello('Peter') // 'undefined: Hello, Peter!'
hello('Peter') // 'Wendy: Hello, Peter!'
hello.apply(o, ['Peter']) //  'Wendy: Hello, Peter!'

// standalone

function bind(func, ctx) {
    return function (param) {
        func.call(ctx, param)
    }
}

bind(hello, o)('Peter') //'Wendy: Hello, Peter!'

/*
Function.prototype.bind = function (ctx) {

    return function (param) {
        this.call(ctx, param)
        //this.apply(ctx, [param])
    }
}
*/

bind(hello, o)('Peter')
//esto nos va a dar un TypeError: this.call is not a function xq hay una rebundancia con el this en la linea 45. Para solucionarlo creamos una variable self y le asignamos el valor de this de cuando la funcion fue creada(var self = this) como vemos en el proximo ejemplo. Para el apply hay q pasarle los paramentros dentro de un array.

//////////////////////////////// 

// native reload

delete Function.prototype.bind

Function.prototype.bind = function (ctx) {
    var self = this
    return function (param) {
        self.call(ctx, param)
        // return self.apply(ctx, [param]) se puede usar con o sin return, en el call igual, sin o con return
    }
}
hello.bind(o)('Peter') //'Wendy: Hello, Peter!'

// en el caso de apply el resultado seria el mismo: //'Wendy: Hello, Peter!'


console.dir(Function.prototype) // de esta forma podemos averiguar todos los metodos de funtion

// ƒ anonymous()
// apply: ƒ apply()
// arguments: (...)
// bind: ƒ bind()
// call: ƒ call()
// caller: (...)
// constructor: ƒ Function()
// length: 0
// name: ""
// toString: ƒ toString()
// Symbol(Symbol.hasInstance): ƒ[Symbol.hasInstance]()
// get arguments: ƒ()
// set arguments: ƒ()
// get caller: ƒ()
// set caller: ƒ()

// [[FunctionLocation]]:
// [[Prototype]]: Object
// [[Scopes]]: Scopes[0]