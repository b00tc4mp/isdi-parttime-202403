var nums = [1, 2, 3, 4, 5];

function forEach(i) {
    if (i < nums.length) {
        var num = nums[i]
        console.log(num);
        forEach(i + 1);
    }
}
forEach(0);
