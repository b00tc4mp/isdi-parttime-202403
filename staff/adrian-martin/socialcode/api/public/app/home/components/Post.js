class Post extends Component {
    constructor(post) {
        super('article')

        this.addClass('Post')

        const authorTitle = new Component
        authorTitle.setText(post.author)
        authorTitle.addClass('AuthorTitle')

        const postTitle = new Component('h2')
        postTitle.setText(post.title)
        postTitle.addClass('PostTitle')

        const postImage = new Image
        postImage.setUrl(post.image)
        postImage.addClass('Image')

        const postDescription = new Component('p')
        postDescription.setText(post.description)

        const postDate = new Component('time')
        postDate.setText(post.date)

        this.add(authorTitle)
        this.add(postTitle)
        this.add(postImage)
        this.add(postDescription)
        this.add(postDate)

        if (post.author === logic.getLoggedInUsername()) {
            const deleteButton = new Button('Delete')

            deleteButton.addClass('deleteButton')

            deleteButton.onClick(() => {
                const confirm = new Confirm
                confirm.setText('Delete the post?')

                confirm.onConfirm(() => {
                    try {
                        logic.deletePost(post.id, error => {
                            if(error){
                                alert(error.message)

                                return
                            }
                            this.onPostDeletedListener()
                        })
                    } catch (error) {
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