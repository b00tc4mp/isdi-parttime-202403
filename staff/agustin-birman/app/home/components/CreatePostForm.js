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

<<<<<<< HEAD
        const exitButton = new Button('X')
        exitButton.addClass('ExitButton')
        exitButton.setType('button')

        exitButton.onClick((event) => {
            event.preventDefault()
            createPostForm.clear()
            view.remove(divCreatePost)
        })
=======
        const exitButton = new Button
        exitButton.setText('X')
        exitButton.addClass('ExitButton')
>>>>>>> a2fc28ce2924d11bb35aa943bc05a27afe6f6ead

        this.add(heading)
        this.add(titleField)
        this.add(imageField)
        this.add(descriptionField)
        this.add(submitButton)
        this.add(exitButton)
<<<<<<< HEAD

        this.onSubmit(event => {
            event.preventDefault()

            const title = createPostForm.getTitle()
            const image = createPostForm.getImage()
            const description = descriptionField.getDescription()

            this.onCreatePostSubmitListener(title, image, description)
        })
=======
>>>>>>> a2fc28ce2924d11bb35aa943bc05a27afe6f6ead
    }

    getTitle() {
        const title = this.children[1]

        return title.getValue()
    }

    getImage() {
        const image = this.children[2]

        return image.getValue()
    }
<<<<<<< HEAD
=======
    getDescription() {
        const description = this.children[3]
>>>>>>> a2fc28ce2924d11bb35aa943bc05a27afe6f6ead

    onCreatePostSubmit(listener) {
        this.onCreatePostSubmitListener = listener
    }

}

