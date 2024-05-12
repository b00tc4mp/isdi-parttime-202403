class CreatePostForm extends Form {
  constructor() {
    super();
    this.removeClass("Form");
    this.addClass("create-post-form");

    const feedbackPanel = new Paragraph();
    feedbackPanel.addClass("feedback");
    this.feedbackPanel = feedbackPanel;

    const titleField = new Field("title", "text", "Title");
    titleField.setPlaceholder("title");

    const imageField = new Field("image", "text", "Image");
    imageField.setPlaceholder("image");

    const descriptionField = new Field("description", "text", "Description");
    descriptionField.setPlaceholder("description");

    const submitButton = new SubmitButton("Create");

    this.add(titleField);
    this.add(imageField);
    this.add(descriptionField);
    this.add(submitButton);
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
}
