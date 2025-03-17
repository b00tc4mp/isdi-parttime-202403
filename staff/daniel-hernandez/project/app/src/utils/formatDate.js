export const formatDate = isoDate => {
   const date = new Date(isoDate);
   const options = { year: 'numeric', month: 'short', day: 'numeric' };
   return date.toLocaleDateString('en-US', options); // Output: "Oct 5, 2022"
};
