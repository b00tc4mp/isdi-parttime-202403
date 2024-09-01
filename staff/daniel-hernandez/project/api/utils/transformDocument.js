import mongoose from 'mongoose';

// Converts a mongoose(lean) document to a transformed object
const transformDocument = obj => {
   if (obj && typeof obj === 'object') {
      // Recursively transforms nested documents
      const transformNestedDocuments = item => {
         if (Array.isArray(item)) {
            return item.map(transformNestedDocuments);
         } else if (mongoose.Types.ObjectId.isValid(item)) {
            return item.toString(); // Directly convert ObjectId to string
         } else if (item && typeof item === 'object') {
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
   }
   return obj;
};

export default transformDocument;
