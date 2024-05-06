class CreatePostForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('CreatePostForm')

        const titleField = new Field('title', 'text', 'Title')
        titleField.setPlaceholder('title')

        const imageField = new Field('image', 'text', 'Image')
        imageField.setPlaceholder('image')

        const descriptcionField = new Field('description', 'text', 'Descriptcion')
        descriptcionField.setPlaceholder('descriptcion')

        const submitButton = new SubmitButton('Create')

        this.add(titleField)
        this.add(imageField)
        this.add(descriptcionField)
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
            const descriptcionField = this.children[2]
            
            return descriptcionField.getValue()
        }
    }
