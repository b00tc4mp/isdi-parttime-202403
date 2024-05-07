class CreatePostForm extends FormWithFeedback {
    constructor() {
        super()


        this.addClass('CreatePostForm')

        const titleField = new Field('title', 'text', 'Title')
        titleField.setPlaceholder('title')
        titleField.addClass('form-input')

        const imageField = new Field('image', 'text', 'Image')
        imageField.setPlaceholder('image')
        imageField.addClass('form-input')

        const descriptionField = new Field('description', 'text', 'Description')
        descriptionField.setPlaceholder('description')
        descriptionField.addClass('description-input')

        const cancelButton = new Button('Cancel')
        cancelButton.setType('button')

        this.cancelButton = cancelButton
        cancelButton.addClass('form-button')

        const submitButton = new SubmitButton('Create')
        submitButton.addClass('form-button')


        this.add(titleField)
        this.add(imageField)
        this.add(descriptionField)
        this.add(cancelButton)
        this.add(submitButton)


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
        this.cancelButton.onClick(listener)
    }



}