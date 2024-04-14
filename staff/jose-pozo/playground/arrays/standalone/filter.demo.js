delete Array.prototype.filter;

function filter(array, callback) {
  var filterArr = [];

  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    var matched = callback(element);

    if (matched) {
      filterArr[filterArr.length] = element;
    }
  }

  return filterArr;
}

console.info('CASE create new array with length greater than 6');

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var filtered = filter(words, function (element) {
  return element.length > 6;
});

console.assert(words.length === 5, 'words length is 5');
console.assert(filtered.length === 3, 'filtered length is 3');
console.assert(filtered[0] === 'exuberant', 'filtered at 0 is exuberant');
console.assert(filtered[1] === 'destruction', 'filtered at 1 is destruction');
console.assert(filtered[2] === 'present', 'filtered at 2 is present');
