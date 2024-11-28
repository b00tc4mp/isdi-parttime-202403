//debugger

function forEach(array, i) {
    if (i < array.length) {
        var element = array[i]

        console.log(element)

        forEach(array, i + 1)
    }
}

var nums = [10, 20, 30, 40, 50]
forEach(nums, 0)


var chars = ['a', 'b', 'c', 'd', 'e', 'f']
forEach(chars, 0)

// VM817:7 10
// VM817:7 20
// VM817:7 30
// VM817:7 40
// VM817:7 50
// VM817:7 a
// VM817:7 b
// VM817:7 c
// VM817:7 d
// VM817:7 e
// VM817:7 f