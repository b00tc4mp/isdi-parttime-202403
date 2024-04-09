delete Array.prototype.filter

function filter(array, callback ) {

    var filtered = []

    for ( var i = 0; i < array.length; i++) {
        var element = array[i]

        var matches = callback(element, i, array)

        if (matches)
         filtered[filtered.length] = element
    }


    return filtered
}

console.info('CASE filters words with length greater than 6')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = filter(words, function(word) { return word.length > 6})

console.debug(result)

//ouput : [ 'exuberant', 'destruction', 'present' ]

console.info('CASE filter animals')

var animals = ['elephant', 'koala', 'kangoroo', 'chimpanzee', 'gorilla']
var data = []

var result = filter(animals, function ( animal, index, animals ) {
    var matches = animal.includes('e')

    if (matches)
        data[data.length] = { animal: animal, index: index, animal: animals }

    return matches
})

console.debug(result)
//output ['elephant', 'chimpanzee']

console.debug(data)
