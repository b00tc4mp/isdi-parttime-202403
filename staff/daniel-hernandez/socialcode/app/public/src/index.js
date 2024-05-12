if (!logic.isUserLoggedIn()) {
  location.href = "../../login/";
}

const body = new Component(document.body);

const navBar = new Div();
navBar.addClass("nav-bar");
const username = logic.getUsername();
const usernameDisplay = new Paragraph();
usernameDisplay.setText(username);
const logoutButton = new Button();
logoutButton.removeClass("Button");
logoutButton.addClass("logout-button");
logoutButton.setText("logout");
logoutButton.stopListeningAfterClick(() => {
  logic.logoutUser();

  location.href = "../../login/";
});

body.add(navBar);
navBar.add(logoutButton);
navBar.add(usernameDisplay);

const main = new Component("main");
main.addClass("main-content");
body.add(main);

const postList = new Component("section");
main.add(postList);

const posts = logic.getAllPosts();
posts.forEach((post) => {
  const post2 = new Post(post);

  postList.add(post2);
});

const createPostForm = new CreatePostForm();
createPostForm.onSubmit((event) => {
  event.preventDefault();

  const title = createPostForm.getTitle();
  const image = createPostForm.getImage();
  const description = createPostForm.getDescription();

  try {
    logic.createPost(title, image, description);

    // TODO dismount createPostForm from main
    // TODO refresh post list
  } catch (error) {
    if (error instanceof ContentError) {
      createPostForm.setFeedback(`${error.message}`);
    } else {
      createPostForm.setFeedback(`Error. Please try again later.`);
    }
  }
});

//main.add(createPostForm);

const footer = new Component("footer");
footer.addClass("Footer");

const addPostButton = new Button();
addPostButton.removeClass("Button");
addPostButton.addClass("create-post");
addPostButton.setText("+");
addPostButton.onClick(() => {
  main.add(createPostForm);
});

footer.add(addPostButton);

body.add(footer);
