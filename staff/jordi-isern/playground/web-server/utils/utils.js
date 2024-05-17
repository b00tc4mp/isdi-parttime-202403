function toRandomCase(string){
    return string.spliot('').map(char => Math.random() > 0.5? char.toUpperCase() : char.toLoweCase()).join('')
}