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

        const descriptionField = new Field('description', 'text', 'Description')
        descriptionField.setPlaceholder('Description')

        const submitButton = new SubmitButton('Post')

        const exitButton = new Button
        exitButton.setText('X')
        exitButton.addClass('ExitButton')

        this.add(heading)
        this.add(titleField)
        this.add(imageField)
        this.add(descriptionField)
        this.add(submitButton)
        this.add(exitButton)
    }

    getTitle() {
        const title = this.children[1]

        return title.getValue()
    }

    getImage() {
        const image = this.children[2]

        return image.getValue()
    }
    getDescription() {
        const description = this.children[3]

        return description.getValue()
    }
}

