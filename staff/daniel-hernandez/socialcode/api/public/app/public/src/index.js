if (!logic.isUserLoggedIn()) {
  location.href = "../../login/";
}

const body = new Component(document.body);

// nav bar
// TODO create nav bar component
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

const postList = new PostList();
main.add(postList);

const createPostForm = new CreatePostForm();
createPostForm.onPostCreated(() => {
  main.remove(createPostForm);
  postList.load();
});

createPostForm.onCancelClick(() => main.remove(createPostForm));

const footer = new Component("footer");
footer.addClass("Footer");

const addPostButton = new Button();
addPostButton.removeClass("Button");
addPostButton.addClass("create-post");
addPostButton.setText("+");
addPostButton.onClick(() => main.add(createPostForm));

footer.add(addPostButton);

body.add(footer);
