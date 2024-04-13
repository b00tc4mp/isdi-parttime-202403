delete Array.prototype.find

function find(array, callback){  //toma 2 argumnetos array y callback
    
    for(var i = 0; i < array.length; i++){  // recorrre el array
        if(callback(array[i]))  //para cada elemento llama callback, si devuelve true pasa el elemento
            return array[i]   //si se cumple condicion la funcion lo devuelve
    }
    return undefined  // si no se encuentra ningun elemento true , devuelve undefined

}

console.info('CASE return fist element true')

var num = [5, 12, 8, 130, 44];

var found = find(num, function(element) { return  element > 10});

console.debug(found);
// Expected output: 12

console.info('CASE search the object in the array')

var inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
  ];
  
  function isCherries(fruit) {
    return fruit.name === "cherries";
  }
  
  console.log(find(inventory, isCherries));
  // { name: 'cherries', quantity: 5 }