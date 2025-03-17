import mongoose from 'mongoose';

// Converts a mongoose (lean) document to a transformed object
const transformDocument = obj => {
   if (!obj || typeof obj !== 'object') return obj;

   const transformNestedDocuments = item => {
      if (Array.isArray(item)) {
         return item.map(transformNestedDocuments);
      }

      if (mongoose.Types.ObjectId.isValid(item)) {
         return item.toString();
      }

      if (item instanceof Date) {
         return item.toISOString(); // Convert date into ISO string
      }

      if (item && typeof item === 'object') {
         const transformedItem = {};

         for (const key in item) {
            if (key === '_id') {
               transformedItem.id = item[key].toString();
            } else {
               transformedItem[key] = transformNestedDocuments(item[key]);
            }
         }

         return transformedItem;
      }

      return item;
   };

   return transformNestedDocuments(obj);
};

export default transformDocument;
