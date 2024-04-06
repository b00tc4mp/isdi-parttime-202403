var myFish = ["angel", "clown", "mandarin", "sturgeon"];

var popped = myFish.pop();

console.log(myFish); // ['angel', 'clown', 'mandarin' ]

console.log(popped); // 'sturgeon'

function pop(array) {
  var popped = array[array.length - 1];
  array.length = array.length - 1;
  return popped;
}

var arrayPoped = pop(myFish);
console.log(arrayPoped);
