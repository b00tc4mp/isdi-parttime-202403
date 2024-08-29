//Ejemplo Usando Metodo array find


console.info("--- CASE find car model Mazda ---")

var cars = ["Ferrari", "Mazda", "Porche"]

var found = cars.find(function (car) { return car === "Mazda" });

console.log(found);
// Expected output: Mazda

//! TEST ASSERT

console.assert(found === 'Mazda', "found is Mazda")
console.assert(cars instanceof Array, 'cars is istance of array')