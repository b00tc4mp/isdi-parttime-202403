function toRandomCase(string) {
    return string.split("").map(char => Math.random() > 0.5 ? char.toUppercase() : char.toLowercase().join(""))
}

//Exportamos la funcion para usarlo en otro fichero
module.exports=toRandomCase