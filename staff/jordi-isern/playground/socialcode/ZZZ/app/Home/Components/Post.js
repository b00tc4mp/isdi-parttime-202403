class Post extends Component {
  constructor(post) {
    super("article");
    const postTitle = new Heading(2);
    postTitle.setText(post.title);
    const authorTitle = new Heading(3);
    authorTitle.setText(post.author);
    const postImage = new Image();
    postImage.setUrl(post.image);
    const postDescription = new Component("p");
    postDescription.setText(post.description);

    const postDate = new Component("time");
    postDate.setText(post.date);

    this.add(authorTitle);
    this.add(postTitle);
    this.add(postImage);
    this.add(postDescription);
    this.add(postDate);

    if (post.author === logic.getLoggedInUsername()) {
      const deleteButton = new Button("Delete");

      deleteButton.onClick(() => {
        const confirm = new Confirm();
        confirm.setText("Delete the post?");

        confirm.onConfirm(() => {
          logic.deletePost(post.id);

          this.onPostDeletedListener();
        });

        confirm.onCancel(() => this.remove(confirm));

        this.add(confirm);
      });
      this.add(deleteButton);
    }
  }

  onPostDeleted(listener) {
    this.onPostDeletedListener = listener;
  }
}