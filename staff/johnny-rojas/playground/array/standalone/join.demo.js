//delete Array.prototype.join

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

//--------------------------------------------------

console.info('CASE join with script')

var names = ['Ana', 'Juan', 'Manuel', 'Ana', 'Sergio']
var group = join(names, '-')
console.debug(names)
//output:['Ana', 'Juan', 'Manuel', 'Ana', 'Sergio']
console.debug(group)
//output: Ana-Juan-Manuel-Ana-Sergio

//--------------------------------------------------

console.info('CASE join the number with slash')

var number = [878, 1989, 7138, 1890]
var slashNumber = join(number, '/')
console.debug(number)
console.debug(slashNumber)