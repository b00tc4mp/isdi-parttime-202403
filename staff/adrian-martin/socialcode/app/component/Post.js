class Post extends Component{
    constructor(post){
        super('article')
    
        const authorTitle = new Component
        authorTitle.setText(post.author)
        
        const postTitle = new Component('h2')
        postTitle.setText(post.title)
        
        const postImage = new Image
        postImage.setUrl(post.image)
        
        const postText = new Component('p')
        postText.setText(post.text)
        
        this.add(authorTitle)
        this.add(postTitle)
        this.add(postImage)
        this.add(postText)
    }
}