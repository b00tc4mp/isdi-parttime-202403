import React, { useRef, useState } from "react";
import styles from "./CreatePostForm.module.css";
import logic from "../../logic";
import errors from "../../errors";
const { ContentError } = errors;

function CreatePostForm({ onPostCreated, onCancel }) {
  const formRef = useRef(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = formRef.current;

    const title = form.title.value;
    const image = form.image.value;
    const description = form.description.value;

    try {
      logic.createPost(title, image, description, (error) => {
        if (error) {
          if (error instanceof ContentError) {
            setFeedback(`${error.message}`);
            setTimeout(() => setFeedback(""), 5000);
          } else {
            setFeedback("Error. please try again later");
            setTimeout(() => setFeedback(""), 5000);
          }

          return;
        }

        onPostCreated();
      });
    } catch (error) {
      if (error) {
        if (error instanceof ContentError) {
          setFeedback(`${error.message}`);
          setTimeout(() => setFeedback(""), 5000);
        } else {
          setFeedback("Error. please try again later");
          setTimeout(() => setFeedback(""), 5000);
        }
      }
    }
  };

  return (
    <div className={styles.createPostFormOverlay}>
      <form className={styles.createPostForm} ref={formRef}>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input className={styles.input} id="title" type="text" name="title" />
        </div>
        <div className={styles.field}>
          <label htmlFor="image">Image</label>
          <input className={styles.input} id="image" type="text" name="image" />
        </div>
        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <input
            className={styles.input}
            id="description"
            type="text"
            name="description"
          />
        </div>
        <button
          className={styles.cancelPostButton}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className={styles.createPostButton}
          type="submit"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
}

export default CreatePostForm;
