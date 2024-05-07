
class NewPostForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass("NewPostForm")

        //TODO verificar type email
        const titleField = new Field("title", "text", "Title")
        titleField.setPlaceholder("title")

        const imageField = new Field("image", "text", "Image")
        imageField.setPlaceholder("Image")

        const descriptionField = new Field("description", "text", "Description")
        descriptionField.setPlaceholder("description")

       

        const submitButton = new SubmitButton("Register")


        this.add(titleField)
        this.add(imageField)
        this.add(descriptionField)
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

}
