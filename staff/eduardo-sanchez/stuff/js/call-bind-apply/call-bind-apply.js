//El metodo bind siempre pide un conxtexto 


debugger
function add(dx, dy, dz) {
    return {
        x: this.x + dx,
        y: this.y + dy,
        z: this.z + dz
    }
}

//add(5, 10, 20) //{ x: NaN, y: NaN, z: NaN }
//window.add(5, 10, 20) //{ x: NaN, y: NaN, z: NaN }

var o = { x: 10, y: 20, z: 30 }

//add.bind(o)(5, 10, 20) //{ x: 15, y: 30, z: 50 }


delete Function.prototype.bind


/*
Function.prototype.bind = function (ctx) {

    return function () {
        
        return this.call(ctx, ...arguments)
        //return this.apply(ctx, [...arguments])
    }
}
*/
//esto nos va a dar un TypeError: this.call is not a function xq hay una rebundancia con el this en la linea 29. Aqui estaria llamando al this de esa instancia en vez de al this de fuera. Para solucionarlo creamos una variable self y le asignamos la referencia del valor de this cuando la funcion fue creada(var self = this , este this hace referencia la contexto q es "o") como vemos en el proximo ejemplo. Para el apply hay q pasarle los paramentros dentro de un array.


Function.prototype.bind = function (ctx) {
    var self = this

    return function () {

        return self.call(ctx, ...arguments)
        //return self.apply(ctx, [arguments])
    }
}

//add.bind(o)(5, 10, 20)
//{ x: 15, y: 30, z: 50 }

var addBoundToO = add.bind(o)

console.log(addBoundToO(5, 10, 20))
console.log(addBoundToO(10, 20, 40))
// VM2035:31 {x: 15, y: 30, z: 50}
// VM2035:32 {x: 20, y: 40, z: 70}
// undefined

//var o continua siendo = {x: 10, y: 20, z: 30}