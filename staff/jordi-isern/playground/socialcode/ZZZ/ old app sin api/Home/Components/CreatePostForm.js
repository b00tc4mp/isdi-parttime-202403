class CreatePostForm extends FormWithFeedback {
    constructor(){
        super()
        this.addClass('createPostForm')
   

        const titleField = new FieldInput ('title', 'text', 'Title')
        titleField.setPlaceholder('Title')

        const imageField = new FieldInput('image','text','Image')
        imageField.setPlaceholder('Image')
    
        const descriptionField = new FieldTextarea('description', 'Description')
        descriptionField.setPlaceholder('Description')

        const submitButton = new SubmitButton('Create')


        const cancelButton = new Button('Cancel')
        cancelButton.setType('button')
        cancelButton.addClass('cancelButton')

        cancelButton.onClick(event => {
            event.preventDefault()

            this.clear()

            this.onCancelClickListener()
        })

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
                logic.createPost(title, image, description)

                this.clear()
                this.onPostCreatedListener()
            }   catch (error){
                if(error instanceof ContentError){
                    this.setFeedback(error.message + ', please, correct it')
                }else{
                    this.setFeedback('Sorry there was an error, plase try again later')
                }
            }
        })
    }

    getTitle(){
        const titleField = this.children[0]

        return titleField.getValue()
    }
    getImage(){
        const imageField = this.children[1]

        return imageField.getValue()
    }

    getDescription(){
        const descriptionField = this.children[2]

        return descriptionField.getValue()
    }

    onCancelClick (listener){
        this.onCancelClickListener = listener

    }

    onPostCreated(listener){
        this.onPostCreatedListener = listener
    }
}