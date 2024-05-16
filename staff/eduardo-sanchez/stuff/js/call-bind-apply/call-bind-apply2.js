function add(dx, dy) {
    return {
        x: this.x + dx,
        y: this.y + dy
    }
}

add(5, 10)
window.add(5, 10)

// { x: NaN, y: NaN }
// { x: NaN, y: NaN }


var o = { x: 10, y: 20 }

add.bind(o)(5, 10)

//{ x: 15, y: 30 }

// standalone
function bind(func, ctx) {
    return function (param1, param2) {
        return func.call(ctx, param1, param2)
    }
}

bind(add, o)(5, 10)

//{ x: 15, y: 30 }