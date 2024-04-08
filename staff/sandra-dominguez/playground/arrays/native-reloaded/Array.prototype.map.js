//CASO 1 multiplica por dos

Array.prototype.map = function(callback) {
    var mapped = []

    for(var i = 0; i < this.length; i++) {
        var element = this[i]
        var mappedElement = callback(element)

        mapped[i] = mappedElement
    }
    return mapped
    }

var nums = [1, 4, 9, 16]

var numsBy2 = nums.map(function(num) { return num * 2})

console.log(numsBy2);