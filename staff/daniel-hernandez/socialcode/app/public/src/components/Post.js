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

    this.add(postTitle);
    this.add(authorTitle);
    this.add(postImage);
    this.add(postText);
  }
}
