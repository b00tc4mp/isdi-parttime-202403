class Post extends Component {
    constructor(post) {
        super('article')

        const postAuthor = new Component('p')
        postAuthor.setText(post.author)
        postAuthor.addClass('Author')

        const postTitle = new Component('h2')
        postTitle.setText(post.title)
        postTitle.addClass('Title')

        const postImage = new Image
        postImage.setUrl(post.image)
        postImage.addClass('Image')

        const postDescription = new Component('p')
        postDescription.setText(post.description)

        const postDate = new Component('time')
        postDate.setText(post.date)
        postDate.addClass('Date')

        this.add(postAuthor)
        this.add(postTitle)
        this.add(postImage)
        this.add(postDescription)
        this.add(postDate)
    }
}