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

Array.prototype.filter = function filter(callback) {
  var filterResult = [];

  for (var i = 0; i < this.length; i++) {
    var thisElement = this[i];
    var found = false;

    if (typeof thisElement === "number") {
      if (thisElement === callback()) {
        filterResult[filterResult.length] = thisElement;
      }
      continue;
    }

    for (var j = 0; j < thisElement.length; j++) {
      var thisElementParts = thisElement[j];

      if (thisElementParts === callback()) {
        found = true;
        break;
      }
    }
    if (found) {
      filterResult[filterResult.length] = thisElement;
    }
  }
  return filterResult;
};

console.log(vegetables.filter(itHasAnO));
