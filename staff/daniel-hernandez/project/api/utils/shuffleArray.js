// Utilizes the Fisher-Yates shuffle algorithm
const shuffleArray = arr => {
   if (!arr || typeof arr !== 'object' || !Array.isArray(arr)) return arr;

   const shuffledArray = [...arr];
   for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
   }

   return shuffledArray;
};

export default shuffleArray;
