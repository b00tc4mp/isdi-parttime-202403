delete Array.prototype.every;


function every(array, callback) {
	for (var i = 0; i < array.length; i++) {
		var element = array[i];

		var matches = callback(element);
		if (!matches) {
			return false;
		}
	}

	return true;
}

var numbers = [1, 30, 45, 29, 15];

var result = every(numbers, function (num) {return num < 40;})

console.debug(result);
// Expected output: false

var animals = ['dog', 'dog', 'dog'];

var print = every(animals, function (animal) {return animal === "dog"})

console.log(print);
//Exped output: false
