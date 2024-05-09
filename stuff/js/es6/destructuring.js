var o = { a: 1, b: 2 }

var a = o.a
var b = o.b

console.log(a, b)
// VM1439:6 1 2

// equal to

var o = { a: 1, b: 2 }

var { a } = o
var { b } = o

console.log(a, b)
// VM1584: 6 1 2

// equal to

var o = { a: 1, b: 2 }

var { a, b } = o

console.log(a, b)
// VM1656:5 1 2

// equal to

var o = { a: 1, b: 2 }

var { a: A, b: B } = o

console.log(A, B)
// VM1723:5 1 2

// WARN

var o = { a: 1, b: 2 }

var { a: A, b: B } = o

console.log(A, B)
// VM1843:5 1 2

console.log(a, b)
// VM1843:7 Uncaught ReferenceError: a is not defined
//     at <anonymous>:7:13

// another example

var n = [1, 2]

var { 0: a, 1: b } = n

console.log(a, b)
// VM1919:5 1 2

// equal to

var n = [1, 2]

var [a, b] = n

console.log(a, b)
// VM1956:5 1 2

// only want b

var n = [1, 2]

var [, b] = n

console.log(b)
// VM2005:5 2

// only want c

var n = [1, 2, 3]

var [, , c] = n
console.log(c)
// VM2051: 4 3

// destructuring top

var o = {
    a: 1,
    b: [
        2,
        [
            3,
            {
                4: [
                    5,
                    {
                        hello: 'world'
                    },
                    6
                ],
                7: 'seven',
                8: 'eight'
            },
            9
        ],
        10
    ],
    c: 11
}

//var hello = o.b[1][1][4][1].hello
var { b: [, [, { 4: [, { hello }] }]] } = o

console.log(hello)
// world