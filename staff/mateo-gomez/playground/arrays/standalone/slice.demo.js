delete Array.prototype.slice




function slice(array, start, end) {
    
    if (end === undefined){

        if (start > 0) {   //Aquí se prueba cuando el start es positivo
                // array -> ['ant', 'bison', 'camel', 'duck', 'elephant']
                // start -> 2
            
                var sliced = []  //Lo primero es crear un nuevo array vacío para guardar ahí lo extraído del array original

                //sliced[0] = array[2]
                //sliced[1] = array[3]    --> Con esto nos hacemos una idea mental de cómo debería de quedar el nuevo array
                //sliced[2] = array[4]

                for (var i = start; i < array.length; i++) {  //Ponemos el ojo en el array original
                    var element = array[i]  //Extraemos el elemento de ese array en la posición indicada por [i]

                    sliced[i - start] = element //Ese elemento extraído en el calculo anterior lo ponemos ahora en la variable sliced, en la posición [i - start]
                }



        } else if (start < 0){ // Aquí se prueba cuando el start es negativo 
                var sliced = []

                var fromIndex = array.length + start   //Desde donde empezamos nuestro nuevo array

                for (var i = fromIndex; i < array.length; i++){  //Una vez que hemos calculado ya desde dónde empieza el nuevo array podemos expresarlo en un bucle for puesto que ya tenemos la inicialización y el tamaño del array (que ya lo teníamos)

                    var element = array[i] // Aquí el punto de vista sigue puesto en el array de entrada (el original)

                    sliced[i - fromIndex] = element //Para contar desde cero en sliced tenemos que restarle el fromIndex para que parta de cero
                }
        
        }

        return sliced //Esto lo dejamos fuera del bucle for porque no tendría sentido que estuviera dentro y fuera del if porque es común a todos los if sino tendríamos que escribir al final de todos los if el return sliced

    //} else if { (start === 2 && end === 4)
        // array -> ['ant', 'bison', 'camel', 'duck', 'elephant']
        // start -> 2
        // end -> 4  --> No se incluye el último elemento

       // var sliced = []



       // return sliced

    //} else if { (start === 1 && end === 5)
        // array -> ['ant', 'bison', 'camel', 'duck', 'elephant']
        // start -> 1
        // end -> 5

       // var sliced = []



       // return sliced

    } else {

        if (end > 0) {
            var sliced = []

            for (var i = start; i < end; i++){
                var element = array[i]

                sliced[sliced.length] = element
            }

            return sliced

        }else if (end < 0) {
            var toIndex = array.length + end // elemento final. RECORDATORIO: tanto como en el cálculo del start que se ha hecho antes como en este end se le suma el valor de start y de end al length del array original ya que cuando se traten de números negativos (que se cuentan de derecha a izquierda) la suma de + - será - (se restará)

            for (var i = start; i < toIndex; i++){
                var element = array[i]  //Se sigue utilizando el array[i] puesto que se refiere al array original

                sliced[sliced.length] = element
            }

            return sliced
        }


    }


   
}


console.info('CASE extract animals from index 2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant', 'cocodrile', 'snake']

var result = animals.slice(3)
console.log(result)

console.assert(result.length === 4, 'result length is 4')
console.assert(result[0] === 'duck', 'result animal at 0 is duck')
console.assert(result[1] === 'elephant', 'result animal at 1 is elephant')
console.assert(result[2] === 'cocodrile', 'result animal at 2 is cocodrile')
console.assert(result[3] === 'snake', 'result animal at 3 is snake')


console.info('CASE extract animals from index 2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant', 'cocodrile', 'snake']

var result = animals.slice(3)
console.log(result)

console.assert(result.length === 4, 'result length is 4')
console.assert(result[0] === 'duck', 'result animal at 0 is duck')
console.assert(result[1] === 'elephant', 'result animal at 1 is elephant')
console.assert(result[2] === 'cocodrile', 'result animal at 2 is cocodrile')
console.assert(result[3] === 'snake', 'result animal at 3 is snake')
