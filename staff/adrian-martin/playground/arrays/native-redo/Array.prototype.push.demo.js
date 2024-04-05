Array.prototype.push = function (){
    for(var i = 1; i < arguments.length; i++){
        var argument = arguments[i]

        this[this.length] = argument
    }
            
    return this.length
}

console.info('CASE add animal to array')

var animals = ['pigs', 'goats', 'sheep'];

var count = aniamls.push('cows');

console.debug(count);
// Expected output: 4
console.assert(count === 4, 'count is 4')

console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]
console.assert(animals[0] === 'pigs', 'animals 0 is pigs')
console.assert(animals[1] === 'goats', 'animals 1 is goats')
console.assert(animals[2] === 'sheeps', 'animals 2 is sheeps')
console.assert(animals[3] === 'cows', 'animals 3 is cows')
console.assert(animals.lenght === 4, 'animals lenght is 4')

console.info('CASE add various animals to array')

var animals = ['pigs', 'goats', 'sheep', 'crow'];

var count = animals.push(animals, 'chickens', 'cats', 'dogs');
console.debug(count)
//7
console.assert(count === 7, 'count is 7')

console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
console.assert(animals[0] === 'pigs', 'animals 0 is pigs')
console.assert(animals[1] === 'goats', 'animals 1 is goats')
console.assert(animals[2] === 'sheeps', 'animals 2 is sheeps')
console.assert(animals[3] === 'cows', 'animals 3 is cowa')
console.assert(animals[4] === 'chickens', 'animals 4 is chickens')
console.assert(animals[5] === 'cats', 'animals 5 is cats')
console.assert(animals[6] === 'dogs', 'animals 6 is dogs')
console.assert(animals.lenght === 7, 'animals lenght is 7')

console.info('CASE add no element to array')

var animals = ['pigs', 'goats', 'sheep', 'crow'];

var count = push(animals)

console.debug(count)
//4

console.debug(animals)
//['pigs', 'goats', 'sheep', 'crow']
