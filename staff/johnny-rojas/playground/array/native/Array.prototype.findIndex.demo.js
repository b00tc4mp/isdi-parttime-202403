var numbers = [5, 12, 8, 130, 44];
var isLargeNumber = findIndex(numbers, function (element) {
  return element > 13;
});

console.debug(isLargeNumber);
//output: 3

