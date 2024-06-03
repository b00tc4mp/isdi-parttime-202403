class Post extends Component {
    constructor(post) {
        super("article")

        const authorTitle = new Component("p")
        authorTitle.setText(post.author)

        const postTitle = new Component("h2")
        postTitle.setText(post.title)

        const postImage = new Image
        postImage.setUrl(post.image)

        const postDescription = new Component("p")
        postDescription.setText(post.description)

        const postDate = new Component("time")
        postDate.setText(post.date)

        this.add(authorTitle)
        this.add(postTitle)
        this.add(postImage)
        this.add(postDescription)
        this.add(postDate)

        // si el autor es el mismo que se ha logueado, permite eliminar post 
        if (post.author === logic.getLoggedInUsername()) {
            const deleteButton = new Button('Delete')

            //añadimos el compo confirm
            deleteButton.onClick(() => {
                //logic.deletePost(post.id)

                const confirm = new Confirm
                confirm.setText("Delete the post?")

                confirm.onConfirm(() => {
                    try {
                        logic.deletePost(post.id, error => {
                            if (error) {
                                alert(error.message)

                                return
                            }
                            this.onPostDeletedListener()
                        })
                    } catch (error) {
                        console.error(error)

                        alert(error.message)
                    }
                })
                confirm.onCancel(() => this.remove(confirm))

                this.add(confirm)
            })

            this.add(deleteButton)
        }
    }

    onPostDeleted(listener) {
        this.onPostDeletedListener = listener
    }
}