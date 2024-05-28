class CreatePostForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('CreatePostForm')

        const heading = new Heading(2)
        heading.setText('Create a new post!')

        const titleField = new Field('title', 'text', 'Text')
        titleField.setPlaceholder('Title')

        const imageField = new Field('image', 'text', 'Image')
        imageField.setPlaceholder('Image URL')

        const descriptionField = new DescriptionField('description', 'Description')

        const submitButton = new SubmitButton('Post')

        const exitButton = new Button('X')
        exitButton.addClass('ExitButton')
        exitButton.setType('button')

        exitButton.onClick((event) => {
            event.preventDefault()
            this.clear()
            view.remove(divCreatePost)
        })

        this.add(heading)
        this.add(titleField)
        this.add(imageField)
        this.add(descriptionField)
        this.add(submitButton)
        this.add(exitButton)

        this.onSubmit(event => {
            event.preventDefault()

            const title = this.getTitle()
            const image = this.getImage()
            const description = descriptionField.getDescription()
            try {
                postLogic.createPost(title, image, description, error => {
                    if (error) {
                        if (error instanceof ContentError)
                            this.setFeedback(error.message + ', please, correct it')
                        else
                            this.setFeedback('Sorry, there was an error, please try again later')

                        return
                    }
                })

                this.clear()

                this.onPostCreatedListener()
            } catch (error) {
                if (error instanceof ContentError)
                    this.setFeedback(error.message + ', please, correct it')
                else
                    this.setFeedback('Sorry, there was an error, try later again')
            }
        })
    }

    getTitle() {
        const title = this.children[1]

        return title.getValue()
    }

    getImage() {
        const image = this.children[2]

        return image.getValue()
    }

    onPostCreated(listener) {
        this.onPostCreatedListener = listener
    }
}

