var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

var poped = plants.pop();
console.assert(poped === 'tomato', "tiene que devolver tomato")
console.assert(plants.length === 4, "el length tiene que ser 4")

console.assert(plants[0] === 'broccoli', 'el elemento 0 ha de ser boccoli')
console.assert(plants[1] === 'cauliflower', 'el elemento 1 tiene que ser cauliflower')
console.assert(plants[2] === 'cabbage', 'el elemento 1 tiene que ser cabbage')
console.assert(plants[3] === 'kale', 'el elemento 1 tiene que ser kale')
plants.pop();

console.assert(plants.length === 3, 'el largo tiene que ser 3')


console.assert(plants[0] === 'broccoli', 'el elemento 0 ha de ser boccoli')
console.assert(plants[1] === 'cauliflower', 'el elemento 1 tiene que ser cauliflower')
console.assert(plants[2] === 'cabbage', 'el elemento 1 tiene que ser cabbage')

