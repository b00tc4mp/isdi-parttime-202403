function hello(to) {
    debugger
    console.log(`${this.from}: Hello, ${to}!`)
}

//hello('Peter')
//window.hello('Peter')
//var from = 'Wendy'
//hello('Peter')

var o = { from: 'Wendy' }
//hello.call(o, 'Peter')
//hello.bind(o)('Peter')
//o.hello = hello
//o.hello('Peter')
//hello('Peter')
//hello.apply(o, ['Peter'])

// standalone
/*
function bind(func, ctx) {
    return function(param) {
        func.call(ctx, param)
    }
}
*/
//bind(hello, o)('Peter')

// native reload
delete Function.prototype.bind
Function.prototype.bind = function (ctx) {
    var self = this
    return function (param) {
        self.call(ctx, param)
    }
}
hello.bind(o)('Peter')
