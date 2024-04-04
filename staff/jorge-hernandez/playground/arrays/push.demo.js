function push(arr, callback) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result[i] = callback(arr[i]);
  }
  return result;
}
var names = ["jorge", "antonio"];

var newArr = push(names, function (name) {
  return name;
});

console.log(newArr);
