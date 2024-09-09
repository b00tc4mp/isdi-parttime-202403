function Irriy(elemen1, elemen2){
    this[0] = elemen1
    this[1] = elemen2

    this.length = 2

}

console.info('CASE constructs an instance with two elements')

var fruits = new Irriy('Apple', 'Banana') 

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy')
console.assert(!(fruits instanceof Array), 'fruits is not an instance of Array')
console.assert(fruits.length === 2, 'fruits length is 2')
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana', 'fruit at index 1 is Banana')