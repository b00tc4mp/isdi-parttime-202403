function add(dx, dy) {
    return {
        x: this.x + dx,
        y: this.y + dy
    }
}

//add(5, 10)
//window.add(5, 10)

var o = { x: 10, y: 20 }

//add.bind(o)(5, 10)

// standalone
function bind(func, ctx) {
    return function (param1, param2) {
        return func.call(ctx, param1, param2)
    }
}

bind(add, o)(5, 10)