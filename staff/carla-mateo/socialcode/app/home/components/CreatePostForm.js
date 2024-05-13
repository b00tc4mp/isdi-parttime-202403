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

        cancelButton.onClick(event => {
            event.preventDefault()

            this.clear()

            this.onCancelClickListener()
        })

        const submitButton = new SubmitButton('Create')

        this.add(titleField)
        this.add(imageField)
        this.add(descriptionLabel)
        this.add(descriptionTextArea)
        this.add(cancelButton)
        this.add(submitButton)

        this.onSubmit(event => {
            event.preventDefault()

            const title = this.getTitle()
            const image = this.getImage()
            const description = this.getDescription()

            try {
                logic.createPost(title, image, description)

                createPostForm.clear()

                this.onPostCreatedListener()

            } catch (error) {
                if (error instanceof ContentError)
                    createPostForm.setFeedback(error.message + ', please, correct it')
                else
                    createPostForm.setFeedback('❌ Sorry, there was an error, please try again later')
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