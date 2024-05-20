const vowels = 'aeiou'
const numbres = '4310V'

function vowelsToNumbers(string) {
  return string.split('').map(char => {
    const index = vowels.indexOf(char.toLowerCase())

    if (index > -1)
      return numbres[index] 

    return char
  }).join('')
}

module.exports = vowelsToNumbers


