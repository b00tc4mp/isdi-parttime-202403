var peter = {
    name: 'Peter',
    salute: function (to) {
        return `${this.name}: ${to}!`
    }
}

peter.salute('Wendy')
// 'Peter: Wendy!'

var peter = {
    name: 'Peter',
    salute: to => {
        return `${this.name}: ${to}!`
    }
}

peter.salute('Wendy')
// ': Wendy!'


var peter = {
    name: 'Peter',
    salute: to => `${this.name}: ${to}!`
}

peter.salute('Wendy')
// ': Wendy!'


var peter = {
    name: 'Peter',
    salute: function (to) {
        return `${this.name}: ${to}!`
    }.bind(this)
}

peter.salute('Wendy')
// ': Wendy!'

window.name
//''


/*
The issue with the code(line31 forward) lies in the use of .bind(this) on the salute function. The this keyword in the context of the code outside any object method or function refers to the global object (in a browser, it's window).

Here’s a breakdown of what happens:

1 You create an object peter with a name property and a salute method.
2 The salute method uses this.name to access the name property of the object it belongs to.
3 The .bind(this) at the end of the salute method binds the function to the this context, which is the global object (or undefined in strict mode) when the code is executed in a non-method context.

When you call peter.salute('Wendy'), it doesn't find name on the global object, resulting in undefined.

To fix this, remove the .bind(this) so that this correctly refers to the peter object:

var peter = {
    name: 'Peter',
    salute: function (to) {
        return `${this.name}: ${to}!`
    }
};

console.log(peter.salute('Wendy')); // 'Peter: Wendy!'

Alternatively, if you need to use .bind, you should bind it to peter:

var peter = {
    name: 'Peter',
    salute: function (to) {
        return `${this.name}: ${to}!`
    }
};

peter.salute = peter.salute.bind(peter);

console.log(peter.salute('Wendy')); // 'Peter: Wendy!'

Both approaches will ensure that this inside the salute method refers to the peter object, producing the correct output.

*/
