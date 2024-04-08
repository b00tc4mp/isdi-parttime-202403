//Ejemplo Usando Metodo array find


console.info("--- CASE find car model Mazda ---")

var cars = ["Ferrari", "Mazda", "Porche"]

var found = cars.find(function (car) { return car === "Mazda" });

console.log(found);
// Expected output: Mazda
