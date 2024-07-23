function Time({ className, children: time }) {
   const formattedTime = new Date(time).toLocaleString();

   return <time className={className}>{formattedTime}</time>;
}

export default Time;
