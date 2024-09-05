class CreatePostForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('CreatePostForm')

        const titleField = new Field('title', 'text', 'Title')
        titleField.setPlaceholder('title')

        const imageField = new Field('image', 'text', 'Image')
        imageField.setPlaceholder('image')

        const descriptionField = new Field('description', 'text', 'Description')
        descriptionField.setPlaceholder('description')

        const cancelButton = new Button('Cancel')

        cancelButton.setType('button')

        cancelButton.onClick(event => {
            event.preventDefault()

            this.clear()

            this.onCancelClickListener()
        })

        const submitButton = new SubmitButton('Create')

        this.add(titleField)
        this.add(imageField)
        this.add(descriptionField)
        this.add(cancelButton)
        this.add(submitButton)

        this.onSubmit(event => {
            event.preventDefault()

            const title = this.getTitle()
            const image = this.getImage()
            const description = this.getDescription()

            try {
                logic.createPost(title, image, description, error => {

                    if (error) {
                        if (error instanceof ContentError)
                            this.setFeedback(error.message + ', please correct it')

                        else
                            this.setFeedback('an unexpected error happened, try again later')

                        return
                    }

                    this.clear()

                    this.onPostCreatedListener()
                })

            } catch (error) {
                if (error instanceof ContentError)
                    this.setFeedback(error.message + ', please correct it')

                else
                    this.setFeedback('an unexpected error happened, try again later')
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
        const descriptionField = this.children[2]

        return descriptionField.getValue()
    }

    onCancelClick(listener) {
        this.onCancelClickListener = listener
    }

    onPostCreated(listener) {
        this.onPostCreatedListener = listener
    }
}

