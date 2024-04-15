//CASO agregar 2 elementos al inicio

function unshift() {
    if(array.length > 0) {
      var add = array.unshift(4, 5)
      
    }
    return add
  }

var num = [1, 2, 3]
var nums = num.unshift(4, 5)

console.assert(num.length === 5, 'num length is 5')
console.assert(num[0] === 4, 'num at 0 is 4')
console.assert(num[1] === 5, 'num at 1 is 5')
console.assert(num[2] === 1, 'num at 2 is 1')
console.assert(num[3] === 2, 'num at 3 is 2')
console.assert(num[4] === 3, 'num at 4 is 3')
console.log(nums)
console.log(num)