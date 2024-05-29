class PostList extends Component {
  constructor() {
    super("section");

    this.load();
  }

  load() {
    this.removeAll();

    try {
      logic.getAllPosts((error, response) => {
        if (error) {
          console.error(error);

          // TODO show feedback in a more user friendly way
          alert(error.message);

          return;
        }

        const posts = response.posts;

        if (!Array.isArray(posts)) {
          console.error("Expected an array, but got:", posts);
          alert("An error occurred while loading posts.");

          return;
        }

        posts.forEach((post) => {
          const post2 = new Post(post);

          post2.onPostDeleted(() => this.load());

          this.add(post2);
        });
      });
    } catch (error) {
      console.error(error);

      // TODO show feedback in a more user friendly way
      alert(error.message);
    }
  }
}
