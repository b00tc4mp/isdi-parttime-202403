import React, { useState } from "react";
import styles from "./index.module.css";
import logic from "../../logic/index";
import Container from "../atomic/Container.jsx";
import FeedbackForm from "../FeedbackForm.jsx";
import Field from "../atomic/Field.jsx";
import Button from "../atomic/Button.jsx";
import SubmitButton from "../atomic/SubmitButton.jsx";

function CreatePostForm({ onPostCreated, onCancel }) {
   const [feedback, setFeedback] = useState("");

   const handleSubmit = async e => {
      e.preventDefault();

      const form = e.target;

      const title = form.title.value;
      const image = form.image.value;
      const description = form.description.value;

      try {
         await logic.createPost(title, image, description);
         onPostCreated();
      } catch (error) {
         console.error(error);
         setFeedback(`${error.message}`);
         setTimeout(() => setFeedback(""), 5000);
      }
   };

   return (
      <Container className={styles.createPostFormOverlay}>
         <FeedbackForm
            formClassName={styles.createPostForm}
            level="error"
            onSubmit={handleSubmit}
            errorClassName={styles.feedback}
            errorMessage={feedback}
         >
            <Field fieldClassName={styles.field} inputClassName={styles.input} id="title" type="text">
               Title
            </Field>
            <Field fieldClassName={styles.field} inputClassName={styles.input} id="image" type="text">
               Image
            </Field>
            <Field fieldClassName={styles.field} inputClassName={styles.input} id="description" type="text">
               Description
            </Field>
            <Button className={styles.cancelPostButton} onClick={onCancel}>
               Cancel
            </Button>
            <SubmitButton className={styles.createPostButton}>Create</SubmitButton>
         </FeedbackForm>
      </Container>
   );
}

export default CreatePostForm;
