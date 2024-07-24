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

        // this.cancelButton = cancelButton //se referencia como propiedad para poder acceder a el 

        //le añadimos responsabilidad al constructor para que realice la accion del boton cancelar
        cancelButton.onClick(event => {
            event.preventDefault()

            this.clear()

            this.onCancelClickListener()
        })

        const submitButton = new SubmitButton("Share")
        // se guarda la funcion de forma temporal hasta que es llamado, se guarda como propiedad en lugar de asignarlo directamente al boton


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
                logic.createPost(title, image, description, error => {
                    if (error) {
                        console.error(error)
                        if (error instanceof ContentError)
                            this.setFeedback(error.message + ", please, correct it")
                        else
                            this.setFeedback("sorry, there was an error, please try again later")
                        return
                    }
                    this.clear()

                    this.onPostCreatedListener()
                })

            } catch (error) {
                if (error instanceof ContentError)
                    this.setFeedback(error.message + ", please, correct it")
                else
                    this.setFeedback("sorry, there was an error, please try again later")
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

    /*  onCancelClick(listener) {
         this.cancelButton.onClick(listener)
      }
    */

    onCancelClick(listener) {
        this.onCancelClickListener = listener
    }


    onPostCreated(listener) {
        this.onPostCreatedListener = listener
    }
}
