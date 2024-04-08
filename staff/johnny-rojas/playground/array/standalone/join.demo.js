//delete Array.prototype.join

console.info('Case join without method')

function join(array, separator) {
  var joined = ''
  for (var i = 0; i < array.length; i++) {
    if (i > 0) {
      joined += separator
    }
    joined += array[i];
  }
  return joined
}

var names = ['Ana', 'Juan', 'Manuel', 'Ana', 'Sergio']
var group = join(names, '-')
console.debug(names)
//output:['Ana', 'Juan', 'Manuel', 'Ana', 'Sergio']
console.debug(group)
//output: Ana-Juan-Manuel-Ana-Sergio