const formatSeconds = totalSeconds => {
   if (totalSeconds < 0) return '00:00';

   const hours = Math.floor(totalSeconds / 3600);
   const minutes = Math.floor((totalSeconds % 3600) / 60);
   const seconds = totalSeconds % 60;

   const formattedMinutes = minutes.toString().padStart(2, '0');
   const formattedSeconds = seconds.toString().padStart(2, '0');

   if (hours > 0) {
      const formattedHours = hours.toString().padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
   }
   return `${formattedMinutes}:${formattedSeconds}`;
};

export default formatSeconds;
