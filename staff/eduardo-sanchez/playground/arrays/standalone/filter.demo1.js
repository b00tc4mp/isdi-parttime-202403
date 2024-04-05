function filter(array, callback) {
    var filtered = []

    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        var choosen = callback(element)

        if (choosen)
            filtered[filtered.length] = element
    }

    return filtered
}

console.info('CASE filters words with length greater than 6')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present']

var result = filter(words, function (word) { return word.length > 6 && word.includes("s") })

console.debug(result)
// Expected output: Array ["exuberant", "destruction", "present"]