class Post extends Component{
    constructor(post){
        super('article')
    
        const authorTitle = new Component
        authorTitle.setText(post.author)
        
        const postTitle = new Component('h2')
        postTitle.setText(post.title)
        
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