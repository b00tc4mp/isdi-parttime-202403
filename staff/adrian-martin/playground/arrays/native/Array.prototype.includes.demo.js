console.info('CASE check numbers')

var num= [1, 2, 3];

console.debug(num.includes(2));
// true

console.info('CASE check the animals')

var pets = ['cat', 'dog', 'bat'];

console.debug(pets.includes('cat'));
// true

console.debug(pets.includes('at'));
//  false

console.info('CASE check the numbers 2')

console.debug([1, 2, 3].includes(2))
// true

console.debug([1, 2, 3].includes(4))
// false

console.debug ([1, 2, 3].includes(3, 3))
// false

console.debug ([1, 2, 3].includes(3, -1))
// true

console.debug ([1, 2, NaN].includes(NaN))
// true

console.debug (["1", "2", "3"].includes(3))
// false

console.log('CASE from index is greater or equal than lenght the matriz')

var num = ["a", "b", "c"];

console.debug (num.includes("c", 3))
// false

console.debug (num.includes("c", 100))
// false
