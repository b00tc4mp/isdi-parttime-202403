class PostList extends Component {
    constructor() {
        super('section')

        this.load()
        // const posts = logic.getAllPosts()

        // posts.forEach(post => {

        //     const post2 = new Post(post)

        //     this.add(post2)
        // })

    }

    load() {
        this.removeAll()

        const posts = logic.getAllPosts()

        posts.forEach(post => {

            const post2 = new Post(post)

            post2.onPostDeleted(() => this.load())

            this.add(post2)
        })

    }
}