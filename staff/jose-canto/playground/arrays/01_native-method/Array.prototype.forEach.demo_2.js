//Ejemplo Usando Metodo array forEach 

console.info(" -- CASE create objects with each iteration arguments -- ")

var cars = ["Lamgorghini", "Ferrari", "Porche", "Maserati"]

var data = []

cars.forEach(function (car, index, cars) {
  var object = { car: car, index: index, cars: cars }

  // Añadir un objeto al final del array sin utilizar el método .push().
  // Accedemos a la longitud actual del array 'data' utilizando data.length, y asignamos el objeto a la posición correspondiente.
  data[data.length] = object;

})

console.debug(data)
console.table(data)


/*
┌─────────┬───────────────┬───────┬─────────────────────────────────────────────────────────┐
│ (index) │ car           │ index │ cars                                                    │
├─────────┼───────────────┼───────┼─────────────────────────────────────────────────────────┤
│ 0       │ 'Lamgorghini' │ 0     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 1       │ 'Ferrari'     │ 1     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 2       │ 'Porche'      │ 2     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 3       │ 'Maserati'    │ 3     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
└─────────┴───────────────┴───────┴─────────────────────────────────────────────────────────┘ 
*/