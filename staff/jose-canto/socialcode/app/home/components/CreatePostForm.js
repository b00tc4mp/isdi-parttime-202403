class CreatePostForm extends FormWithFeedback {
  constructor() {
    super()

    this.addClass("CreatePostForm")

    const titleField = new Field('title', 'text', 'Title')
    titleField.setPlaceholder('title')

    const imageField = new Field('image', 'text', 'Image')
    imageField.setPlaceholder('image')


    const descriptionLabel = new Label()
    descriptionLabel.setText("Description")


    const descriptionTextArea = new TextArea()
    descriptionTextArea.setPlaceholder("description.....")
    descriptionTextArea.setId("TextArea")
    this.descriptionTextArea = descriptionTextArea


    const cancelButton = new Component("i")
    cancelButton.addClass("fa-regular")
    cancelButton.addClass("fa-rectangle-xmark")

    //this.cancelButton = cancelButton ya no es necesario referenciarlo porque lo hacemos en el metodo mas abajo.
    cancelButton.onClick(() => {
      createPostForm.clear()

      this.onCancelClickListener()
    })

    const submitButton = new SubmitButton("Create")

    this.add(titleField)
    this.add(imageField)
    this.add(descriptionLabel)
    this.add(descriptionTextArea)
    this.add(submitButton)
    this.add(cancelButton)

    this.onSubmit((event) => {
      event.preventDefault()

      const title = createPostForm.getTitle()
      const image = createPostForm.getImage()
      const description = createPostForm.getDescription()

      try {
        logic.createPost(title, image, description)

        this.clear()

        this.onPostCreatedListener()

      } catch (error) {
        if (error instanceof ContentError) {
          createPostForm.setFeedback(error.message + ", please correct it")
        } else {
          createPostForm.setFeedback("Sorry, there was an error, ples try again later")
        }
      }
    })
  }

  getTitle() {
    const titleField = this.children[0]

    return titleField.getValue()
  }

  getImage() {
    const imageField = this.children[1]

    return imageField.getValue()
  }

  getDescription() {
    const descriptionTextArea = createPostForm.descriptionTextArea.getValue()
    return descriptionTextArea
  }


  onCancelClick(listener) {
    this.onCancelClickListener = listener
  }

  onPostCreated(listener) {
    this.onPostCreatedListener = listener
  }
}
