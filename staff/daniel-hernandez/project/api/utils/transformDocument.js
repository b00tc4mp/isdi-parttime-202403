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

      if (item && typeof item === 'object') {
         if (item._id) {
            item.id = item._id.toString();
            delete item._id;
         }

         for (const key in item) {
            item[key] = transformNestedDocuments(item[key]);
         }
      }

      return item;
   };

   return transformNestedDocuments(obj);
};

export default transformDocument;
