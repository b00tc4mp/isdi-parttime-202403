class CreatePostForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('CreatePostForm')

        const titleField = new Field('title', 'text', 'Title')
        titleField.setPlaceholder('title')

        const descriptionLabel = new Label()
        descriptionLabel.setText("Description")


        const descriptionTextArea = new TextArea()
        descriptionTextArea.setPlaceholder("description.....")
        descriptionTextArea.setId("TextArea")
        this.descriptionTextArea = descriptionTextArea

        const imageField = new Field('image', 'text', 'Image')
        imageField.setPlaceholder('image')

        const cancelButton = new Button('Cancel')
        cancelButton.setType('button')
        cancelButton.addClass('CancelButton')

        this.cancelButton = cancelButton

        const submitButton = new SubmitButton('Create')

        this.add(titleField)
        this.add(imageField)
        this.add(descriptionLabel)
        this.add(descriptionTextArea)
        this.add(cancelButton)
        this.add(submitButton)

        this.onSubmit(event => {
            event.preventDefault()

            const title = createPostForm.getTitle()
            const image = createPostForm.getImage()
            const description = createPostForm.getDescription()

            this.onPostSubmitListener(title, image, description)

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
        this.cancelButton.onClick(listener)
    }

    onPostSubmit(listener) {
        this.onPostSubmitListener = listener
    }
}