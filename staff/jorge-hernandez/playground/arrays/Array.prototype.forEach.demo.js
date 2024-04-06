delete Array.prototype.forEach;

Array.prototype.forEach = function forEach(callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i];
    callback(element);
  }
};
var chars = ["a", "b", "c"];
// forEach with for
function forEach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    var char = arr[i];
    callback(char);
  }
}

forEach(chars, function (element) {
  console.log(element);
});

var names = ["Jorge", "Antonio"];

//forEach con recursion
function recur(arr, index) {
  if (index == arr.length) {
    return;
  } else {
    var result = arr[index];
    console.log(result);
    recur(arr, index + 1);
  }
}

recur(names, 0);
