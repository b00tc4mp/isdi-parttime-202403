import './index.css'

import Text from '../../../components/core/Text'
import Button from '../../../components/core/Button'
import View from '../../../components/library/View'
import { Link } from 'react-router-dom'
import Heading from '../../../components/core/Heading'

const instructions = `
**Instructions:**

The objective of this exercise is for students to practice sentence structure in German by filling in the missing words. Follow these steps to create and verify the exercise:

1. **Write the Sentence:**
   - Write a sentence in German.
   - When you reach the word you want the students to complete, leave a blank space.

2. **Leave a Blank Space:**
   - Use the 'Leave Blank' button (or a similar tool) to create the blank space where students will write the correct word.

3. **Write the Correct Word:**
   - After finishing the sentence, write the correct word in a separate place. This will help you to have the correct answer for verification.

**Example of the Process:**

Let's say you want the students to complete the following sentence: 'Pepito hat es gegessen.'

1. **Write the Sentence:**
   - Write: 'Pepito ____ es gegessen.'
   - Use the 'Leave Blank' button to create a space where students will write 'hat.'

2. **Write the Correct Word:**
   - In a separate place, write the correct word: 'hat.'

**Verifying the Exercise:**

1. **Completing the Exercise:**
   - Students will read the sentence with the blank space and write the word they think is missing.
   - For example, they will complete: 'Pepito **hat** es gegessen.'

2. **Verifying the Answers:**
   - Use the 'Check' button to verify if the word entered by the student is correct.
   - If the word is correct, the system should indicate that the answer is correct.
   - If the word is incorrect, the system should indicate that the answer is incorrect and students can try again.
`;





//TODO podria hacer un form con 4 border radius para mejorar la experiencia de usuario
function CompleteSentence() {

   return <View tag='main' className='SelectActivity'>
      <Heading level='3'>Complete the sentence</Heading>
      <Text>{instructions}</Text>
      <Button type='button'><Link to='/activities/info-complete-sentence'>Continue</Link></Button>
   </View>
}

export default CompleteSentence