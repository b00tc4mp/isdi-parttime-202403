class CreatePostForm extends FormWithFeedback {
  constructor() {
    super()
    this.addClass('CreatePostForm')

    const heading = new Heading(1)
    heading.setText('Create New Post')

    const titleField = new Field('title', 'text', 'Title')
    titleField.setPlaceholder('title')

    const imageField = new Field('image', 'text', 'url Image')
    imageField.setPlaceholder('url image')

    const descriptionField = new Field('description', 'text', 'description')
    descriptionField.setPlaceholder('description')

    const divButtons = new Component('div')
    divButtons.addClass('div-Buttons')

    const createButton = new Button()
    createButton.setType('submit')
    createButton.addClass('createButton')
    createButton.setText('Create')

    const cancelButton = new Button()
    cancelButton.setType('button')
    cancelButton.addClass('cancelButton')
    cancelButton.setText('Cancel')

    this.cancelButton = cancelButton

    this.add(heading)
    this.add(titleField)
    this.add(imageField)
    this.add(descriptionField)
    this.add(divButtons)

    divButtons.add(cancelButton)
    divButtons.add(createButton)
    console.log(this.children[4].children[0])
  }

  getTitle() {
    const titleField = this.children[1]
    return titleField.getValue()
  }

  getImage() {
    const imageField = this.children[2]
    return imageField.getValue()
  }

  getDescription() {
    const descriptionField = this.children[3]
    return descriptionField.getValue()
  }

  onCancelClick(listener) {
    this.cancelButton.onClick(listener)
  }
}
