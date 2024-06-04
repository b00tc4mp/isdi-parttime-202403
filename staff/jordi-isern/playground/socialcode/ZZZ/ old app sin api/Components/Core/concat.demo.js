const num1 = [1, 2, 3];
const num2 = [4, 5, 6];
const num3 = [7, 8, 9];


function concat (){
    var array3 = []
    for (i = 0; i < arguments.length; i++){
        for (j=0 ; j< arguments[i].length; j++){
            array3[array3.length] = arguments[i][j]
        }
    }
    return array3
}

console.log(concat(num1, num2, num3))