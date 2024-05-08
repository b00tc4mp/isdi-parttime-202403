class CreatePostForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('CreatePostForm')

        const titleField = new Field('título', 'text', 'Título')
        titleField.setPlaceholder('título')

        const imageField = new Field('imagen', 'text', 'Imagen')
        imageField.setPlaceholder('imagen')

        const descriptionField = new Field('descripción', 'text', 'Descripción')
        descriptionField.setPlaceholder('descripción')

        const submitButton = new SubmitButton('Crear')

        const cancelButton = new Button('Cancelar')
        cancelButton.setType('reset')

        this.cancelButton = cancelButton

        this.add(titleField)
        this.add(imageField)
        this.add(descriptionField)
        this.add(submitButton)
        this.add(cancelButton)
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