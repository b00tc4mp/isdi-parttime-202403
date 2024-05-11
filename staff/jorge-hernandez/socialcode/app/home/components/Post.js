class Post extends Component {
  constructor(post) {
    super('article')
    this.addClass('Post')
    const authorTitle = new Component('p')
    authorTitle.setText(post.author)

    const postTitle = new Component('h2')
    postTitle.setText(post.title)

    const postImage = new Image()
    postImage.setUrl(post.image)

    const postDescription = new Component('p')
    postDescription.setText(post.description)

    const postDate = new Component('time')
    postDate.setText(post.date)

    this.add(authorTitle)
    this.add(postTitle)
    this.add(postImage)
    this.add(postDescription)
    this.add(postDate)

    if (post.author === logic.getLoggedInUsername()) {
      const deleteButton = new Button()
      deleteButton.setType('button')
      deleteButton.setText('delete')
      this.add(deleteButton)

      deleteButton.onClick(() => {
        logic.deletePost(post.id)

        this.onPostDeletedListener()
      })
    }
  }
  onPostDeleted(listener) {
    this.onPostDeletedListener = listener
  }
}
