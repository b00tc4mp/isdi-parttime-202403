class PostList extends Component {
    constructor() {
        super('section')

        this.load()
    }

    load() {
        this.removeAll()

        try {
            logic.getAllPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                posts.forEach(post => {
                    const post2 = new Post(post)

                    post2.onPostDeleted(() => this.load())

                    this.add(post2)
                })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}