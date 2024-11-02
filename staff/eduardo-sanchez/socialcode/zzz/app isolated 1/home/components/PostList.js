class PostList extends Component {
    constructor() {
        super('section')

        this.load()
    }

    load() {
        //TODO check what's going on here, the page reloads on removing all children from this 
        this.removeAll()

        try {
            logic.getAllPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    // TODO show feedback to the user in a better way
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

            // TODO show feedback to the user in a better way
            alert(error.message)
        }
    }
}