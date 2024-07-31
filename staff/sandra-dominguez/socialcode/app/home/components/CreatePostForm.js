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
        cancelButton.setType('button')

        cancelButton.onClick(event => {
            event.preventDefault()

            this.clear()

            this.onCancelClickListener()
        })

        this.add(titleField)
        this.add(imageField)
        this.add(descriptionField)
        this.add(submitButton)
        this.add(cancelButton)

        this.onSubmit(event => {
            event.preventDefault()

            const title = this.getTitle()
            const image = this.getImage()
            const description = this.getDescription()

            try {
                logic.createPost(title, image, description)

                this.clear()

                this.onPostCreatedListener()

            } catch (error) {
                if (error instanceof ContentError)
                    this.setFeedback(error.message + ', por favor corrígelo')
                else
                    this.setFeedback('Lo siento, hubo un error, inténtalo de nuevo más tarde.')
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