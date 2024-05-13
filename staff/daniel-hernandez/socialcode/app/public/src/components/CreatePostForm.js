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
    this.cancelButton = cancelButton;

    this.add(titleField);
    this.add(imageField);
    this.add(descriptionField);
    this.add(cancelButton);
    this.add(submitButton);

    this.onSubmit((event) => {
      event.preventDefault();

      const title = createPostForm.getTitle();
      const image = createPostForm.getImage();
      const description = createPostForm.getDescription();

      this.onPostSubmitListener(title, image, description);
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
    this.cancelButton.onClick(listener);
  }

  onPostSubmit(listener) {
    this.onPostSubmitListener = listener;
  }
}
