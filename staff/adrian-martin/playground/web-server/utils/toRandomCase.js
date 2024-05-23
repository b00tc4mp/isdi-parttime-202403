function toRandomCase(string){
    return string.split('').map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join('')
}

module.exports = toRandomCase  // objeto viejo node para exportar 