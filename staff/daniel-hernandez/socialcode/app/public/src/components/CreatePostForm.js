class CreatePostForm extends Form {
  constructor() {
    super();
    this.removeClass("Form");
    this.addClass("create-post-form");

    const feedbackPanel = new Paragraph();
    feedbackPanel.addClass("feedback");
    this.feedbackPanel = feedbackPanel;

    const titleField = new Field("title", "text", "Title");

    const imageField = new Field("image", "text", "Image");

    const descriptionField = new Field("description", "text", "Description");

    const submitButton = new SubmitButton("Create");
    submitButton.removeClass("SubmitButton");
    submitButton.addClass("create-post-button");

    const cancelButton = new Button("Cancel");
    cancelButton.removeClass("Button");
    cancelButton.addClass("cancel-post-button");
    cancelButton.setType("button");
    cancelButton.onClick((event) => {
      event.preventDefault();
      this.clear();

      this.onCancelClickListener();
    });

    this.add(titleField);
    this.add(imageField);
    this.add(descriptionField);
    this.add(cancelButton);
    this.add(submitButton);

    this.onSubmit((event) => {
      event.preventDefault();

      const title = this.getTitle();
      const image = this.getImage();
      const description = this.getDescription();

      try {
        logic.createPost(title, image, description);

        this.clear();
        this.onPostCreatedListener();
      } catch (error) {
        if (error instanceof ContentError) {
          createPostForm.setFeedback(`${error.message}`);
        } else {
          createPostForm.setFeedback(`Error. Please try again later.`);
        }
      }
    });
  }

  getTitle() {
    const titleField = this.children[0];

    return titleField.getValue();
  }

  getImage() {
    const imageField = this.children[1];

    return imageField.getValue();
  }

  getDescription() {
    const descriptionField = this.children[2];

    return descriptionField.getValue();
  }

  setFeedback(message, type) {
    if (type === "success") {
      this.feedbackPanel.addClass("success");

      this.feedbackPanel.setText(message);
      this.add(this.feedbackPanel);
    }
  }

  clear() {
    super.clear();

    this.feedbackPanel.setText("");
    this.feedbackPanel.removeClass("success");

    this.remove(this.feedbackPanel);
  }

  onCancelClick(listener) {
    this.onCancelClickListener = listener;
  }

  onPostCreated(listener) {
    this.onPostCreatedListener = listener;
  }
}
