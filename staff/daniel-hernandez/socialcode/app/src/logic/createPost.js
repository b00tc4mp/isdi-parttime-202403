import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const createPost = (title, image, description) => {
   validate.text(title, "Title", 50);
   validate.url(image, "Image");
   validate.text(description, "Description", 200);

   return (async () => {
      let res, body;

      try {
         res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${sessionStorage.token}`,
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               title,
               image,
               description
            })
         });
      } catch {
         throw new SystemError("Server error");
      }

      if (res.status === 201) return;

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

export default createPost;
