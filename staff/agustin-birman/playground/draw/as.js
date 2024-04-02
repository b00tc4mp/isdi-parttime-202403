var nums = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50];

function map(array, callback) {
	
  var newArray = [];
  
  for(let i = 0; i < array.length; i++){
  	var newElement = callback(array[i])
    
    newArray[i] = newElement;
  }
  return newArray;
}

arraySquared = map(nums, function(num){return num * 2});

console.log(arraySquared);