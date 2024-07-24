class NewPostForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass("NewPostForm")

        const titleField = new Field("title", "text", "Title")
        titleField.setPlaceholder("title")

        const imageField = new Field("image", "text", "Image")
        imageField.setPlaceholder("Image")

        const descriptionField = new Field("description", "text", "Description")
        descriptionField.setPlaceholder("description")

        const cancelButton = new Button("Cancel")
        cancelButton.setType("button")
        // especificamos tipo button para que al dar al enter no actue como un submit

        this.cancelButton = cancelButton //se referencia como propiedad para poder acceder a el 

        const submitButton = new SubmitButton("Share")


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
