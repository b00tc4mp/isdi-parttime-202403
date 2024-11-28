
function unshift(array, element1, element2) {
        var index =  
        var firstE = element1
        var secondE = element2
        var newArray = []

    for(var i = 0; i < array.length; i++) {
                
        }

    return array.length
        
    }






var numbers = [1, 2, 3]

var sol = unshift(numbers, 4)
// Expected output: 4

console.log(sol);
// Expected output: Array [4, 1, 2, 3]

console.assert(sol.length === 4,'4 es la longitud')
console.assert(sol[0] === 4, 'en la posicions 0  es 4')
console.assert(sol[1] === 1,'en la pos 1 es 1')
console.assert(sol[2] === 2,'en la ps 2 es 2')
console.assert(sol[3] === 3,'es la pos 3 es 3')

var sol2 = unshift(numbers, 4, 5)
// Expected output: 4

console.log(sol2);
// Expected output: Array [4, 1, 2, 3]

console.assert(sol.length === 5,'5 es la longitud')
console.assert(sol[0] === 4, 'en la posicions 0  es 4')
console.assert(sol[1] === 5,'en la pos 1 es 5')
console.assert(sol[2] === 1,'en la ps 2 es 1')
console.assert(sol[3] === 2,'es la pos 3 es 2')
console.assert(sol[4] === 3,'es la pos 4 es 3')