class Post extends Component {
    constructor(post) {
        super('article')

        this.addClass('Post')

        const authorTitle = new Component('p')
        authorTitle.setText(post.author)
        authorTitle.addClass('AuthorTitle')

        const postTitle = new Component('h2')
        postTitle.setText(post.title)
        postTitle.addClass('PostTitle')

        const postImage = new Image
        postImage.setUrl(post.image)
        postImage.addClass('PostImage')

        const postDescription = new Component('p')
        postDescription.setText(post.description)
        postDescription.addClass('PostDescription')

        const descriptionTitle = new Heading(4)
        descriptionTitle.setText('Description:')
        descriptionTitle.addClass('DescriptionTitle')

        const postDate = new Component('time')
        postDate.setText(post.date)

        this.add(authorTitle)
        this.add(postTitle)
        this.add(postImage)
        this.add(descriptionTitle)
        this.add(postDescription)
        this.add(postDate)

        if (post.author === logic.getLoggedInUsername()) {
            const deleteButton = new Button('Delete')

            deleteButton.onClick(() => {
                /*const confirmed = confirm('Delete the post?')

                if (confirmed) {
                    logic.deletePost(post.id)

                    this.onPostDeletedListener()
                }*/
                const confirm = new Confirm
                confirm.setText('Delete the post?')

                confirm.onConfirm(() => {
                    logic.deletePost(post.id)

                    this.onPostDeletedListener()
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