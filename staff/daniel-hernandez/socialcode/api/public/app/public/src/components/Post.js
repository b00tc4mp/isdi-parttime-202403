class Post extends Component {
  constructor(post) {
    super("article");

    const authorTitle = new Paragraph();
    authorTitle.setText(post.author);
    authorTitle.addClass("author");

    const postTitle = new Component("h2");
    postTitle.setText(post.title);
    postTitle.addClass("post-title");

    const postImage = new Img(post.image);

    const postText = new Paragraph();
    postText.setText(post.description);
    postText.addClass("post-description");

    const postDate = new Component("time");
    postDate.setText(post.date);

    this.add(postTitle);
    this.add(authorTitle);
    this.add(postImage);
    this.add(postText);
    this.add(postDate);

    if (post.author === logic.getUsername()) {
      const deleteButton = new Button("Delete");
      deleteButton.removeClass("Button");
      deleteButton.addClass("remove-post-button");

      deleteButton.onClick(() => {
        const confirmDialog = new Confirm();
        main.add(confirmDialog);
        confirmDialog.showModal();

        confirmDialog.onCancel(() => {
          confirmDialog.close();
          main.remove(confirmDialog);
        });

        confirmDialog.onOk(() => {
          logic.deletePost(post.Id);
          this.onPostDeletedListener();
          confirmDialog.close();
          main.remove(confirmDialog);
        });
      });

      this.add(deleteButton);
    }
  }

  onPostDeleted(listener) {
    this.onPostDeletedListener = listener;
  }
}
