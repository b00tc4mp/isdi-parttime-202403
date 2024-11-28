var names = ["pEdRo", "jOrGe"];
function map(arr, callback) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var name = arr[i];
    result[i] = callback(name);
  }
  return result;
}

var mapped = map(names, function (name) {
  return name.toUpperCase();
});
console.log(mapped);
