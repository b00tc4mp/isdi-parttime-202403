import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const getAllPosts = (page, limit) => {
   validate.number(page, "Page");
   validate.number(limit, "Limit");

   return (async () => {
      let res, postInfo, body;

      try {
         res = await fetch(`${import.meta.env.VITE_API_URL}/posts?page=${page}&limit=${limit}`, {
            headers: {
               Authorization: `Bearer ${sessionStorage.token}`
            }
         });
      } catch {
         throw new SystemError("Server error");
      }

      if (res.status === 200) {
         try {
            postInfo = await res.json();
         } catch {
            throw new SystemError("Server error");
         }

         return postInfo;
      }

      try {
         body = await res.json();
      } catch {
         throw new SystemError("Server error");
      }

      const { error, message } = body;
      const constructor = errors[error];

      throw new constructor(message);
   })();
};

export default getAllPosts;
