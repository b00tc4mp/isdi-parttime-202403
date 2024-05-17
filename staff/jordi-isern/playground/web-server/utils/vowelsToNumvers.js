const vowels = 'aeiou'
const numbers = '4310v'

function vowelsToNumbers(string) {
    return string.string('')(char => {
        const index = vowels.indexOf(char.toLowerCase)
        
        if(index > -1){
            return numbers[index]
        }
        
    }
}
