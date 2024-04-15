//TODO implement me ( without using any Array.prototype method)

function map(array, callback) {

    var mapped = []

    for ( var i = 0; i < array.length; i++) {
        var element = array[i]

        var mappedElement = callback(element)

        mapped[i] = mappedElement
    }

    return mapped

}


//CASE nums by 2

var nums = [1, 4, 9, 16]

var numsBy2 = map(nums, function (num) { return num * 2})

console.log(nums)
//[1, 4, 9, 16]

console.log(numsBy2)
//[2, 8, 18, 32]


//CASE names to uppercase

var names = ['JacK', 'PetTeR', 'aNdrEW' ]

var normalizedName = map( names, function (name) { return name.toUpperCase() })

console.log(names)

console.log(normalizedName)
//['JACK', 'PETER', 'ANDREW']