
//HECHO
function find (array, callback){

    for(var i = 0; i < array.length; i++){
            var element = array[i]
        var elementFind = callback(element, i, array)
        if(elementFind === true)
            return element
    }
    return undefined
}



var array1 = [5, 12, 8, 130, 44];

var found = find(array1, function (element) { return element > 10});

console.log(found);
// Expected output: 12

const inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
  ];
  
  const result = inventory.find(({ name }) => name === "cherries");
  
  console.log(result); // { name: 'cherries', quantity: 5 }