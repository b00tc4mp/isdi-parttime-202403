class PostList extends Component {
    constructor() {
        super('section')

        this.load()
    }

    load() {
        this.removeAll()

        const posts = postLogic.getAllPosts()

        posts.forEach(post => {
            const newPost = new Post(post)

            newPost.onPostDeleted(() => this.load())

            this.add(newPost)
        })
    }
}