class PostList extends Component {
    constructor(){
        super('selection')
        this.load()
    }
    load(){
        this.removeAll()

        const post = logic.getAllPosts()

        posts.foreach(post =>{
            const post2 = new Post(post)

            post2.onPostDeleted(() => {this.load()})

            this.add(post2)
        })
    }
}