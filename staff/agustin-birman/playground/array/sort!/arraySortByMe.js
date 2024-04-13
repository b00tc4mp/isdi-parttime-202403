debugger

function sort ( array ) {

    
    for(var i = 0; i < array.length; i++) {

        if(array[i+1]=== undefined) return array

        if(array[i][0] > array[i+1][0]){
            
            var temporaryElement = array[i+1]

            array[i+1] = array[i]
            array[i] = temporaryElement

            sort(array)

        } 
        
        
    }
    return array


}


var months = ['March', 'Jan', 'Feb', 'Dec', 'April', 'May', 'Jun', 'Jul', 'August','September','October','November']

console.log(sort(months))
// var array = ['asd','dsa']

// var result = array[0][0] < array[1][0]  
// console.log(result)
