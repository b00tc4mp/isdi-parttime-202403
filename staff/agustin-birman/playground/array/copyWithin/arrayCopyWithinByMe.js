function copyWithin (array, target, start, end) {

    if(start >= array.length) return array

    var indexStart,indexEnd, indexTarget 

    indexTarget = target < 0 ? array.length + target : target
    indexStart = start < 0 ? array.length + start : start
    indexEnd = end===undefined ? array.length: (end < 0 ? array.length + end : end)

    var elementCopyWithin =[]

    for(var i = 0; i <array.length; i++){ // se crea una nueva array para poder obtener los datos reales sin que se sobreescriban los valores de la array a modificar
        elementCopyWithin[i] = array[i]
    }

    for( indexStart; indexStart < indexEnd; indexStart++, indexTarget++){
        array[indexTarget] = elementCopyWithin[indexStart]

    }

   return array
}


const letter = ['a', 'b', 'c', 'd', 'e'];
copyWithin(letter, 0 , 3, 4)
console.log(letter)
// [ 'd', 'b', 'c', 'd', 'e' ]
copyWithin(letter, 1 , 3)
console.log(letter)
// [ 'd', 'd', 'e', 'd', 'e' ]


var number = [1, 2, 3, 4, 5]
copyWithin(number, 0, 3)
console.log(number)
// [4, 5, 3, 4, 5]


var number = [1, 2, 3, 4, 5]
copyWithin(number,0, 3, 4)
console.log(number)
// [4, 2, 3, 4, 5]


var number = [1, 2, 3, 4, 5]
copyWithin(number,-2, -3, -1)
console.log(number)
// [1, 2, 3, 3, 4]

var random = [1, , 3]
copyWithin(random,2, 1, 2)
console.log(random)

var arrayLike = {
    length: 5,
    3: 1,
  };

copyWithin(arrayLike, 0, 3);
console.log(arrayLike)

console.info('CASE target 0, start 3, end 4') // [ 'd', 'b', 'c', 'd', 'e' ]

console.assert(letter.length === 5, 'number.length is 5')
console.assert(letter[0] === 'd', 'number index 0 is d')
console.assert(letter[1] === 'b', 'number index 0 is b')
console.assert(letter[2] === 'c', 'number index 0 is c')
console.assert(letter[3] === 'd', 'number index 0 is d')
console.assert(letter[4] === 'e', 'number index 0 is e')

console.info('CASE target 0, start 3, end 4 modifying the last array')  // [ 'd', 'd', 'e', 'd', 'e' ]

console.assert(letter.length === 5, 'number.length is 5')
console.assert(letter[0] === 'd', 'number index 0 is d')
console.assert(letter[1] === 'd', 'number index 0 is d')
console.assert(letter[2] === 'c', 'number index 0 is c')
console.assert(letter[3] === 'd', 'number index 0 is d')
console.assert(letter[4] === 'e', 'number index 0 is e')
