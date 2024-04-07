function forEach(array, callback){
   for (var i = 0; i < array.length; i++){
      var element = array[i]
    callback(element, i ,array)
   }
}

var chars = ['a', 'b','c']
forEach(chars, console.log(element))