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
        // const confirmed = confirm("Delte the post?")

        // if (confirmed) {
        //   logic.deletePost(post.id)
        //   this.onPostDeletedListener()
        // }

        const confirm = new Confirm()
        confirm.setText("Delete the post?")

        confirm.onConfirm(() => {

          try {
            logic.deletePost(post.id, error => {

              if (error) {

                alert(error.message)
                return
              }

              this.onPostDeletedListener()
            })

          } catch (error) {

            alert(error.message)
          }
        })

        confirm.onCancel(() => {
          divImage.remove(confirm)
        })

        divImage.add(confirm)
      })

      this.add(deleteButton)
    }
  }

  onPostDeleted(listener) {
    this.onPostDeletedListener = listener
  }
}