class PostList extends Component{
    constructor(){
        super("section")

        this.load()
        //ejecutamos el metodo creado que cargara todo de nuevo
    }


    // eliina los hijos si los hay, obtiene todos los posts
    //añade el nuevo post creado
    load(){
        this.removeAll()

        const posts=logic.getPosts()

        posts.forEach(post => {
            const newPost = new Post(post)

            //cuando se elimina el post, refrescar la pagina
            newPost.onPostDeleted(() => this.load())

            this.add(newPost)        
        })
    }
}