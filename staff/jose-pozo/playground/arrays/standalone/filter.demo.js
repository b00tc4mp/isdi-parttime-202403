delete Array.prototype.filter;

var vegetables = [
  "lettuce",
  "tomato",
  "onion",
  "pepper",
  "carrot",
  "garlic",
  "beetroot",
  "pumpkin",
  "broccoli",
];

function itHasAnO() {
  return "o";
}

function filter(array, callback) {
  var filterResult = [];

  for (var i = 0; i < array.length; i++) {
    var vegetable = array[i];
    var found = false;

    for (var j = 0; j < vegetable.length; j++) {
      var letter = vegetable[j];

      if (letter === callback()) {
        found = true;
        break;
      }
    }
    if (found) {
      filterResult[filterResult.length] = vegetable;
    }
  }
  return filterResult;
}

console.log(filter(vegetables, itHasAnO));
