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

// standalone
function bind(func, ctx) {
    return function () {
        //return func.apply(ctx, arguments)
        return func.call(ctx, ...arguments)
    }
}

bind(add, o)(5, 10, 20)