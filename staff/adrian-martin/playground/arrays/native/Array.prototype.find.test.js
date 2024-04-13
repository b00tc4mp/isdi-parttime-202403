console.info('CASE return fist element true')

var num = [5, 12, 8, 130, 44];

var found = num.find(function(element) { return  element > 10});

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
  
  console.log(inventory.find(isCherries));
  // { name: 'cherries', quantity: 5 }