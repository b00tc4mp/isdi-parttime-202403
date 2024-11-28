debugger
function add(dx, dy, dz) {
    return {
        x: this.x + dx,
        y: this.y + dy,
        z: this.z + dz
    }
}

//add(5, 10, 20)
//window.add(5, 10, 20)

var o = { x: 10, y: 20, z: 30 }

//add.bind(o)(5, 10, 20)

delete Function.prototype.bind

Function.prototype.bind = function (ctx) {
    var self = this

    return function () {
        //return self.apply(ctx, arguments)
        return self.call(ctx, ...arguments)
    }
}

//add.bind(o)(5, 10, 20)
var addBoundToO = add.bind(o)

console.log(addBoundToO(5, 10, 20))
console.log(addBoundToO(10, 20, 40))
// VM2035:31 {x: 15, y: 30, z: 50}
// VM2035:32 {x: 20, y: 40, z: 70}
// undefined
o
// {x: 10, y: 20, z: 30}