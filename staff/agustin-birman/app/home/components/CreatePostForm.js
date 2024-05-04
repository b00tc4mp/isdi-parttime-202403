class CreatePostForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('CreatePostForm')

        const titleField = new Field('title', 'text', 'Text')
        titleField.setPlaceholder('Title')

        const imageField = new Field('image', 'text', 'Image')
        imageField.setPlaceholder('Image URL')

        const descriptionField = new Field('description', 'text', 'Description')
        descriptionField.setPlaceholder('Description')

        const submitButton = new SubmitButton('Post')

        this.add(titleField)
        this.add(imageField)
        this.add(descriptionField)
        this.add(submitButton)
    }

    getTitle() {
        const title = this.children[0]

        return title.getValue()
    }

    getImage() {
        const image = this.children[1]

        return image.getValue()
    }
    getDescription() {
        const description = this.children[2]

        return description.getValue()
    }
}

