debugger

var nums = [10, 20, 30, 40, 50]

function forEach(i) {
    if (i < nums.length) {
        var num = nums[i]

        console.log(num)

        forEach(i + 1)
    }
}

forEach(0)
// VM776:9 10
// VM776:9 20
// VM776:9 30
// VM776:9 40
// VM776:9 50