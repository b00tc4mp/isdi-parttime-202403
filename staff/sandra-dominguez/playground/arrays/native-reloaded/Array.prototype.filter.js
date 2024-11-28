Array.prototype.filter = function(callback) {
    var filtered = []

    for(var i = 0; i < this.length; i++) {
        var element = this[i]

        var matches = callback(element)

        if(matches)
           filtered[filtered.length] = element
    }
    return filtered
}

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present']

var result = words.filter(function (word) { return word.length > 6 })

console.debug(result)