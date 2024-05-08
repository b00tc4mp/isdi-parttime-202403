class CreatePost extends FormWithFeedback {
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

        this.cancelButton = new Button
        cancelButton.setText('Cancel')
        cancelButton.addClass('cancelButton')

        this.add(titleField)
        this.add(imageField)
        this.add(descriptionField)
        this.add(cancelButton)
        this.add(submitButton)
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
        this.cancelButton

    }
}