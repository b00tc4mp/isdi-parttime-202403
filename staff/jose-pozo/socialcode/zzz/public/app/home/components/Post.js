class Post extends Component {
    constructor(post) {
        super('article')

        this.addClass('Post')

        const authorTitle = new Component('p')
        authorTitle.setText(post.author)



        const editIcon = new Image
        editIcon.setUrl('../assets/EditIcon.png')
        editIcon.addClass('edit-icon')

        const postHeader = new Component('div')
        postHeader.addClass('PostHeader')

        postHeader.add(authorTitle)



        logic.authorLogged = () => {
            if (post.author === sessionStorage.username) {
                authorTitle.addClass('LoggedUser')
                postHeader.add(editIcon)
            } else
                authorTitle.addClass('AuthorTitle')
        }

        logic.authorLogged()


        const postTitle = new Component('h2')
        postTitle.setText(post.title)
        postTitle.addClass('PostTitle')

        const editList = new Component('ul')
        editList.addClass('edit-list')

        const item1List = new Component('li')
        item1List.setText('Edit')
        item1List.addClass('item-list')
        const item2List = new Component('li')
        item2List.setText('Delete')
        item2List.addClass('item-list')

        editList.add(item1List)
        editList.add(item2List)

        let statusIcon = true

        editIcon.onClick(event => {
            event.preventDefault()

            statusIcon = !statusIcon

            if (!statusIcon)
                postTitle.add(editList)

            else
                postTitle.remove(editList)
        })


        const postImage = new Image
        postImage.setUrl(post.image)
        postImage.addClass('PostImage')

        const postDescription = new Component('p')
        postDescription.setText(post.description)
        postDescription.addClass('PostDescription')

        const postDate = new Component('time')
        postDate.setText(post.date)
        postDate.addClass('PostDate')

        const straightLine = new Component('hr')
        straightLine.addClass('StraightLine')


        this.add(postHeader)
        this.add(postTitle)
        this.add(postImage)
        this.add(postDescription)
        this.add(postDate)
        this.add(straightLine)
    }
}