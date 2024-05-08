class Post extends Component{
    constructor(post){
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

        if (post.author === logic.getLoggedInUsername()){
            const deleteButton = new Button('Delete')

            deleteButton.addClass('deleteButton')

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