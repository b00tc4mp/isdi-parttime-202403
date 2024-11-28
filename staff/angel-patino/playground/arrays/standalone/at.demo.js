//HECHO
function index(arr, indx, callback){
    if(indx > 0){
        for( var i = 0; i < arr.length; i++){
            var pos = indx - 1
        
            if(i === pos){
                var num = i
                var value = arr[num]
                callback(value)
            }    
        }
    }else {
        pos = indx + arr.length
         value = arr[pos]
        callback(value)
     }
}

var array1 = [5, 12, 8, 130, 44]

var position = -1

index(array1, position, function (value) { console.log(`An index of ${position} returns ${value}`)})