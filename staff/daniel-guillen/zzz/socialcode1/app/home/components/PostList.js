class PostList extends Component {
    constructor() {
        super('section')

        this.load()
    }

    load() {
        this.removeAll()

        const posts = logic.getAllPosts()

        posts.forEach(post => {
            const post2 = new Post(post)

            post2.onPostDeleted(() => this.load())

            this.add(post2)
        })
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth' // Esto hace que el desplazamiento sea suave, puedes omitirlo si prefieres un desplazamiento instantáneo
          });
    }
    
}