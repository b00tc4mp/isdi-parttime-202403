
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


var people = [{ name: 'Peter', age: 30 }, { name: 'Wendy', age: 29 }]
forEach(people, 0)