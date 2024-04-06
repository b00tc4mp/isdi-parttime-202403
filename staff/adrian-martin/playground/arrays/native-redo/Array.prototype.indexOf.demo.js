delete Array.prototype.indexOf

Array.prototype.indexOf = function(target, index){ 
    
        index = index || 0;
    
        if(index < 0)
            index = Math.max(0, this.length + index)
    
        for(var i = index; i < this.length; i++){
            if(this[i] === target)
                return i
        }
        return -1
    }

console.info('CASE search the animals in array')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.debug(beasts.indexOf('bison'));
// 1

console.debug(beasts.indexOf('bison', 2));
// 4

console.debug(beasts.indexOf('giraffe'));
// -1

console.info('CASE search de value in array')

var numb = [2, 9, 9];

console.debug(numb.indexOf(2))
// 0 

console.debug(numb.indexOf(7))
// -1 

console.debug(numb.indexOf(9, 2))
// 2
console.debug(numb.indexOf(2, -1))
// -1 

console.debug(numb.indexOf(2, -3))
// 0 