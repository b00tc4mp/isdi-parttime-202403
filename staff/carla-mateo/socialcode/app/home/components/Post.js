class Post extends Component {
    constructor(post) {
        super('article')

        this.addClass("Article")

        const postTitle = new Component('h2')
        postTitle.setText(post.title)
        postTitle.addClass("PostTitle")

        const postText = new Component("p")
        postText.addClass("PostText")
        postText.setText(post.description)

        const authorTitle = new Component('p')
        authorTitle.setText(post.author)

        const postImage = new Image
        postImage.setUrl(post.image)
        postImage.addClass("DivImage")

        const divImage = new Component("div")
        divImage.addClass("DivImage")

        const postDate = new Component('time')
        postDate.setText(post.date)

        this.add(authorTitle)
        this.add(postTitle)
        this.add(divImage)
        this.add(postText)
        this.add(postDate)

        divImage.add(postImage)


        if (post.author === logic.getLoggedInUsername()) {
            const deleteButton = new Button('Delete')
            deleteButton.addClass('DeleteButton')

            deleteButton.onClick(() => {
                logic.deletePost(post.id)

                this.onPostDeletedListener()
            })

            this.add(deleteButton)
        }

    }

    onPostDeleted(listener) {
        this.onPostDeletedListener = listener


    }
}


