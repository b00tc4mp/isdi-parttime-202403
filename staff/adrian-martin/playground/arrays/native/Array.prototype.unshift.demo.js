console.info('CASE add the numbers to the beginning of the array')

var num = [1, 2, 3];

console.debug(num.unshift(4, 5)); 
// 5

console.debug(num);
//[4, 5, 1, 2, 3]

console.info('CASE add the numbers in the array')

var num2 = [1, 2];

num2.unshift(0); // 3 
//[0, 1, 2]

num2.unshift(-2, -1); // 5
//[-2, -1, 0, 1, 2]

num2.unshift([-3]);
//[[-3], -2, -1, 0, 1, 2]