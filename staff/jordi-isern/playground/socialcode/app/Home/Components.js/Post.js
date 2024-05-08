class Post extends Component{
    constructor(post){
        super('article')
        const postTitle = new Heading(2)
    postTitle.setText(post.title)
    const authorTitle = new Heading(3)
    authorTitle.setText(post.author)
    const postImage = new Image
    postImage.setUrl(post.image)
    const postDescription = new Component('p')
    postDescription.setText(post.description)

    const postDate = new Component('time')
    postDate.setText(post.date)

    this.add(authorTitle)
    this.add(postTitle)
    this.add(postImage)
    this.add(postDescription)
    this.add(postDate)
    }
}
