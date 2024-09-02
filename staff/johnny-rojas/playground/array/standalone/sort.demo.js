function sort(arr) {
  var len = arr.length;
  for (var i = 0; i < len ; i++) {
      for(var j = 0 ; j < len - i - 1; j++){ 
          if (arr[j].toString() > arr[j + 1].toString()) {
              var temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j+1] = temp;
          }
      }
  }
  return arr;
}

const months = ["March", "Jan", "Feb", "Dec"];
months.sort();
console.log(months);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// Expected output: Array [1, 100000, 21, 30, 4]