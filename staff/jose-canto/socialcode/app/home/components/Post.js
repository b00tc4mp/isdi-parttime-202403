class Post extends Component {
  constructor(post) {
    super("article")

    this.addClass("Article")

    const postTitle = new Component("h2")
    postTitle.setText(post.title)
    postTitle.addClass("PostTitle")

    const postText = new Component("p")
    postText.addClass("PostText")
    postText.setText(post.description)

    const authorTitle = new Component("p")
    authorTitle.setText(post.author)
    authorTitle.addClass("AuthorTitle")

    const postImage = new Image()
    postImage.setImage(post.image)
    postImage.addClass("Image")

    const divImage = new Component("div")
    divImage.addClass("DivImage")


    const postDate = new Component("time")
    postDate.setText(post.date)

    // POST ADD
    this.add(authorTitle)
    this.add(postTitle)
    this.add(postText)
    this.add(divImage)
    this.add(postDate)

    // POST DIVIMAGE ADD
    divImage.add(postImage)

    if (post.author === logic.getLoggedInUsername()) {
      const deleteButton = new Button("Delete")
      deleteButton.addClass("DeleteButton")

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