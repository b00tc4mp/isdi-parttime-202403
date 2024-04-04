delete Array.prototype.filter

console.info('CASE filters words with length greater than 6')

function filter(array, callback{
    var filtered = []

    for(var i = 0; i < array.length; i++){
        var element = array [i]
        var matches = callback(element)
    }
    return filtered
})



var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = filter(words, function(word){ word.length > 6});

console.debug(result);
// Expected output: Array ["exuberant", "destruction", "present"]



