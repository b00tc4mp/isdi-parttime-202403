debugger

var nums = [10, 20, 30, 40, 50]

function forEach(i) {
    if (i >= nums.length) {
        return
    }

    var num = nums[i]

    console.log(num)

    forEach(i + 1)
}

forEach(0)
// VM628:10 10
// VM628:10 20
// VM628:10 30
// VM628:10 40
// VM628:10 50