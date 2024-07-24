class PostList extends Component {
    constructor() {
        super("section")

        this.load()
        //ejecutamos el metodo creado que cargara todo de nuevo
    }


    // eliina los hijos si los hay, obtiene todos los posts
    //añade el nuevo post creado
    load() {
        this.removeAll()

        try {
            logic.getPosts((error, posts) => {
                if(error){
                    console.error(error)
                    alert(error.message)

                    return
                }
                posts.forEach(post => {
                    const newPost = new Post(post)

                    newPost.onPostDeleted(() => this.load())

                    this.add(newPost)
                })
            })


        } catch (error) {
            console.error(error)
            //TODO show feedback panel

            alert(error.message)
        }
    }
}
// eliina los hijos si los hay, obtiene todos los posts
// se obtienen los posts de nuevo
// para cada post se crea un nuevo componente post
// a este post se le agrega un comportamiento de que mediante un evento click se tiene que refrescar la vista
// se vuelve a añadir el post