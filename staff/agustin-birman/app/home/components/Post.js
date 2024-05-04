class Post extends Component {
    constructor(post) {
        super('article')
        this.addClass('Article')



        const postTitle = new Component('h2')
        postTitle.setText(post.title)
        postTitle.addClass('Title')

        const postImage = new Image
        postImage.setUrl(post.image)
        postImage.addClass('Image')

        const postDescription = new Component('p')
        postDescription.setText(post.description)
        postDescription.addClass('Description')

        const postAuthor = new Component('p')
        postAuthor.setText(post.author)
        postAuthor.addClass('Author')

        const postDate = new Component('time')
        postDate.setText(post.date)
        postDate.addClass('Date')


        this.add(postTitle)
        this.add(postImage)
        this.add(postDescription)
        this.add(postDate)
        this.add(postAuthor)
    }
}