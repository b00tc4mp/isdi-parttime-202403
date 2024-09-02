console.info('Case with method filter')

var words = ["spray", "elite", "exuberant", "destruction", "present"];

var result = words.filter(function (word) { return word.length > 6 })

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]


