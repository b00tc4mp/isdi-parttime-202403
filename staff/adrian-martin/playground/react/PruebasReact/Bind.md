// BIND: crea una nueva funcion, que cuando es llamada, asigna a su operador this el valor entregado
// Video: 13-05-2024

console.info('Learn a Bind')

{
    function hello(to) {
        console.log(`${this.from}: Hello, ${to}!`) //undefined: Hello, Peter!
    }

    hello('Peter')
}
// from is undefined but this point to the window
// // this === window    true

// window.hello('Adrian') in devTools

// global.hello('Adrian') in node


console.info('Learn a Bidn 2')

{
    function hello(to) {
        console.log(`${this.from}: Hello, ${to}!`) // Wendy: Hello, Peter!
    }

    var from = 'Wendy'
    hello('Peter')
}

console.info('Learn a Bidn with Object')

{
    function hello(to) {
        console.log(`${this.from}: Hello, ${to}!`)
    }

    var o = {from: 'Wendy'}
    // hello.call(o, 'Peter')   option 1
    hello.bind(o)('Peter')  //  option 2
}

console.info('Learn a Bidn with apply')

// Apply: invoca una determinada funcion asignando el objeto this y un array como parametros para dicha funcion

{
    function hello(to) {
        console.log(`${this.from}: Hello, ${to}!`)
    }

    var o = {from: 'Wendy'}

    hello.apply(o, ['Peter'])
    
}

console.info('Learn a Bidn with our new bind')

{
    function hello(to) {
        console.log(`${this.from}: Hello, ${to}!`)
    }

    var o = {from: 'Wendy'}
    
    function bind(func, ctx) {
        return function(param){
            func.call(ctx, param)
        }
    }

    // bind(hello, o)('Peter') Wendy: Hello, Peter!
}

console.info('Learn a bind with other example')

{
    function add(x, y) {
        return{
            x: this.x + x,
            y: this.y + y
        }
    }

    window.add(10, 10)  //{x: NaN, y: NaN} devTools
    global.add(10, 10)  //{x: NaN, y: NaN} vs

    add(10, 10)  //{x: NaN, y: NaN}
}

console.info('Learn a bind with other example2')

{
    function add(x, y) {
        return{
            x: this.x + x,
            y: this.y + y
        }
    }

    
    var o = {x: 10, y: 20}

    add.bind(o)(5, 10)  // {x: 15, y: 30}     o no cambia
}

console.info('Learn a Bidn with our new bind 2')

{
    function add(x, y) {
        return{
            x: this.x + x,
            y: this.y + y,
        }
    }

    var o = {x: 10, y: 20}
    
    function bind(func, ctx) {
        return function(param, param2){
            func.call(ctx, param, param2)
        }
    }

    bind(add, o)(5, 10) // {x: 15, y: 30}
}

console.info('Learn a Bidn with3 param')

{
    function add(x, y) {
        return{
            x: this.x + x,
            y: this.y + y,
            z: this.z + z
        }
    }

    var o = {x: 10, y: 20, z:30}
    
    function bind(func, ctx) {
        return function(param, param2, param3){
            func.call(ctx, param, param2, param3)
        }
    }

    bind(add, o)(5, 10, 20) // {x: 15, y: 30, z:50}
}

console.info('Learn a Bidn more generic')

{
    function add(x, y) {
        return{
            x: this.x + x,
            y: this.y + y,
            z: this.z + z
        }
    }

    var o = {x: 10, y: 20, z:30}
    
    function bind(func, ctx) {
        return function(){
            func.call(ctx, ...arguments)
        }
    }

    bind(add, o)(5, 10, 20) // {x: 15, y: 30, z:50}
}